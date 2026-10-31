
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../shared/global.css";

const roles = [
  "Developer",
  "Designer",
  "Tester",
  "Vibe Coder",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
];

export default function CompleteProfile({ onComplete, loading = false }) {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    if (!profileImage) {
      setPreview("");
      return;
    }

    const imageUrl = URL.createObjectURL(profileImage);
    setPreview(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [profileImage]);

  const handleRoleToggle = (role) => {
    setSelectedRoles((prev) => {
      if (prev.includes(role)) {
        return prev.filter((item) => item !== role);
      }

      if (prev.length >= 3) return prev;

      return [...prev, role];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("roles", JSON.stringify(selectedRoles));

    if (onComplete) {
      await onComplete(formData);
    }
  };

  return (
    <main className="auth-page complete-profile-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <div className="complete-profile-wrapper">
        <div className="glass-card complete-profile-card">

          <div className="complete-profile-heading">
            <span className="profile-eyebrow">ONE LAST STEP</span>
            <h1>Make it <span>yours.</span></h1>
            <p>
              Let's put a face to your profile. Tell the world
              a little about yourself.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Profile Image */}
            <div className="profile-upload-section">
              <label htmlFor="profile-image" className="profile-image-upload">
                {preview ? (
                  <img src={preview} alt="Profile preview" />
                ) : (
                  <div className="upload-placeholder">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 16V4m0 0L7 9m5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}

                <span className="upload-edit-icon">+</span>
              </label>

              <input
                id="profile-image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setProfileImage(file);
                }}
              />

              <div className="upload-info">
                <h3>Profile picture</h3>
                <p>Upload a photo that represents you.</p>
                <span>JPG, PNG or WEBP · Max 5MB</span>
              </div>
            </div>

            {/* Name */}
            <div className="profile-form-group">
              <label htmlFor="profile-name">Your name</label>
              <input
                id="profile-name"
                type="text"
                placeholder="What should people call you?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                required
              />
            </div>

            {/* Bio */}
            <div className="profile-form-group">
              <div className="profile-label-row">
                <label htmlFor="profile-bio">A little about you</label>
                <span>{bio.length}/160</span>
              </div>

              <textarea
                id="profile-bio"
                placeholder="Building things, breaking things, learning along the way..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={160}
                rows={3}
              />
            </div>

            {/* Roles */}
            <div className="profile-form-group">
              <div className="profile-label-row">
                <label>What describes you?</label>
                <span>Select up to 3</span>
              </div>

              <div className="role-selection">
                {roles.map((role) => {
                  const isSelected = selectedRoles.includes(role);

                  return (
                    <button
                      type="button"
                      key={role}
                      className={`role-chip ${isSelected ? "selected" : ""}`}
                      onClick={() => handleRoleToggle(role)}
                    >
                      {isSelected && <span>✓</span>}
                      {role}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="complete-profile-submit"
              disabled={loading || !name.trim()}
            >
              {loading ? "Saving profile..." : "Complete profile"}
              {!loading && <span>→</span>}
            </button>

            <p className="profile-footer-text">
              You can always update your profile later.
            </p>

          </form>
        </div>

        <button
          className="profile-skip"
          type="button"
          onClick={() => navigate("/")}
        >
          I'll do this later
        </button>
      </div>
    </main>
  );
}
