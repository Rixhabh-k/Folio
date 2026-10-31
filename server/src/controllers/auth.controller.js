import userModel from "../models/user.model.js";
import otpModel from "../models/otp.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomInt } from "crypto";
import { sendEmail } from "../services/mail.service.js";

export async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExist) {
      return res.status(409).json({
        success: false,
        message: "User alreday exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    const emailVerificationToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
    );

    const link = `http://localhost:5173/verify-email?token=${emailVerificationToken}`;

    //send email for verification
    await sendEmail({
      to: email,
      subject: "Welcome to Folio — Verify Your Account",

      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; color: #222; line-height: 1.6;">
    <h2 style="color: #111;">Welcome, ${username}! 👋</h2>

    <p>
      Thank you for joining <strong>Folio</strong>.
      We're excited to have you on board!
    </p>

    <p>
      To get started, please click the link below to verify your account:
    </p>

    <p>
      <a
        href= "${link}"
        style="display: inline-block; padding: 12px 24px; background-color: #111; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;"
      >
        Verify account
      </a>
    </p>

    <p style="font-size: 13px; color: #666;">
      If you didn't create an account with Folio, you can safely ignore this email.
    </p>

    <p style="margin-top: 30px;">
      Best regards,<br />
      <strong>The Folio Team</strong>
    </p>
  </div>
`,
    });

    return res.status(201).json({
      success: true,
      message:
        "Account created successfully, please check you email to verify your account.",
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}

export async function verifyEmail(req, res) {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token not found",
      });
    }

    // invalid ya expired token par ye error throw karta hai, catch me handle hoga
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email: decode.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // link dobara click ho to bhi success hi dikhao
    if (!user.verified) {
      user.verified = true;
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (error) {
    console.log("Error in verifyEmail:", error);

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    return res.status(200).json({
      success: true,
      message: `${user.username} logged in successfully`,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isProfileComplete: user.isProfileComplete,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getMe(req, res) {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId); //.select("-password")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        user,
      });
    }

    return res.status(200).json({
      success: true,
      message: "user fetched successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
}

export async function forgetUsername(req, res) {
  try {
    const { email } = req.body;

    // CHANGE 1: Normalize email to avoid uppercase/lowercase mismatch
    const normalizedEmail = email.trim().toLowerCase();

    const user = await userModel.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email address.",
      });
    }

    if (!user.verified) {
      return res.status(409).json({
        success: false,
        message: "First verify your email address.",
      });
    }

    // CHANGE 2: Use crypto.randomInt instead of Math.random
    // Generates a cryptographically secure 4-digit OTP
    const generateOtp = randomInt(1000, 10000);

    const hashOtp = await bcrypt.hash(generateOtp.toString(), 10);

    // CHANGE 3: Delete previous OTPs for the same email and purpose
    // This ensures only the latest OTP remains valid
    await otpModel.deleteMany({
      email: normalizedEmail,
      purpose: "forgot-username",
    });

    // CHANGE 4: Save OTP before sending the email
    // This prevents sending an OTP that is not stored in the database
    await otpModel.create({
      email: normalizedEmail,
      otpHash: hashOtp,
      purpose: "forgot-username",
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      attempts: 0,
    });

    try {
      await sendEmail({
        to: normalizedEmail,
        subject: "Your OTP for forgotten username",

        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 40px 20px; text-align: center;">
            <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 32px; box-sizing: border-box;">

              <div style="color: #333333; font-size: 22px; font-weight: bold; margin-bottom: 24px;">
                Account Recovery
              </div>

              <div style="color: #555555; font-size: 15px; line-height: 24px; margin-bottom: 24px;">
                This is your OTP to recover your forgotten username. Please enter this OTP to retrieve your username.
              </div>

              <div style="margin-bottom: 24px;">
                <div style="background-color: #f0f4ff; border: 1px dashed #3b82f6; color: #1d4ed8; font-size: 32px; font-weight: bold; letter-spacing: 6px; padding: 14px 28px; border-radius: 6px; display: inline-block;">
                  ${generateOtp}
                </div>
              </div>

              <div style="color: #999999; font-size: 13px; line-height: 18px;">
                This OTP is valid for <strong>5 minutes</strong>. Do not share this code with anyone.
              </div>

            </div>
          </div>
        `,
      });
    } catch (emailError) {
      // CHANGE 5: If email fails, delete the saved OTP
      // Otherwise, an OTP the user never received could remain valid
      await otpModel.deleteMany({
        email: normalizedEmail,
        purpose: "forgot-username",
      });

      throw emailError;
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email.",
    });
  } catch (error) {
    console.error("Forget username error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}


export async function verifyUsernameOtp(req, res) {
  try {
    const { email, otp } = req.body;

    // CHANGE 1: Validate input before processing
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    // CHANGE 2: Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // CHANGE 3: Schema field is 'email', not 'normalizedEmail'
    // Also filter by purpose to avoid mixing different OTP flows
    const findOtp = await otpModel.findOne({
      email: normalizedEmail,
      purpose: "forgot-username",
    });

    if (!findOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }

    // CHANGE 4: Check OTP expiry
    if (findOtp.expiresAt <= new Date()) {
      await otpModel.deleteOne({ _id: findOtp._id });

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    // CHANGE 5: Check maximum attempts
    if (findOtp.attempts >= 5) {
      await otpModel.deleteOne({ _id: findOtp._id });

      return res.status(429).json({
        success: false,
        message: "Maximum OTP attempts exceeded. Request a new OTP.",
      });
    }

    // CHANGE 6: Fixed originalOtp variable typo
    // bcrypt.compare expects the plain OTP first and its hash second
    const originalOtp = findOtp.otpHash;

    const isOtpCorrect = await bcrypt.compare(
      String(otp),
      originalOtp
    );

    if (!isOtpCorrect) {
      // CHANGE 7: Increment attempts for incorrect OTP
      findOtp.attempts += 1;

      if (findOtp.attempts >= 5) {
        await otpModel.deleteOne({ _id: findOtp._id });

        return res.status(429).json({
          success: false,
          message: "Maximum OTP attempts exceeded. Request a new OTP.",
        });
      }

      await findOtp.save();

      return res.status(401).json({
        success: false,
        message: "Incorrect OTP.",
      });
    }

    // CHANGE 8: User schema field is 'email', not 'normalizedEmail'
    const user = await userModel.findOne({
      email: normalizedEmail,
    });

    if (!user || !user.verified) {
      return res.status(400).json({
        success: false,
        message: "Unable to complete username recovery.",
      });
    }

    // CHANGE 9: Send username to the registered email
    // OTP is deleted only after successful email delivery
    await sendEmail({
      to: normalizedEmail,
      subject: "Your username has been recovered",

      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 40px 20px; text-align: center;">
          <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 32px; box-sizing: border-box;">

            <div style="color: #333333; font-size: 22px; font-weight: bold; margin-bottom: 24px;">
              Username Recovered!
            </div>

            <div style="color: #555555; font-size: 15px; line-height: 24px; margin-bottom: 24px;">
              Your username recovery request was successful. Here is your registered username:
            </div>

            <div style="background-color: #f0f4ff; border: 1px dashed #3b82f6; color: #1d4ed8; font-size: 24px; font-weight: bold; letter-spacing: 2px; padding: 16px; border-radius: 6px; margin-bottom: 28px;">
              ${user.username}
            </div>

            <a href="http://localhost:3000/login"
              style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: bold; padding: 14px 32px; border-radius: 6px;">
              Login to Your Account
            </a>

            <div style="color: #999999; font-size: 13px; line-height: 20px; margin-top: 28px;">
              If you did not request this username recovery, you can safely ignore this email.
            </div>

          </div>
        </div>
      `,
    });

    // CHANGE 10: Invalidate OTP after successful email delivery
    await otpModel.deleteOne({ _id: findOtp._id });

    // CHANGE 11: Added missing success response
    return res.status(200).json({
      success: true,
      message: "If verification was successful, check your email.",
    });

  } catch (error) {
    console.error("Verify username OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}

