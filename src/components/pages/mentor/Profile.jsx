import React, { useState } from "react";
import { FaUser, FaEnvelope, FaBook, FaTwitter, FaLinkedin, FaEdit, FaLock, FaPlus, FaTimes } from "react-icons/fa";

const Profile = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [showSocialLinks, setShowSocialLinks] = useState(false);

    const [mentor, setMentor] = useState({
        fullName: "John Doe",
        email: "johndoe@example.com",
        bio: "Experienced React & Node.js developer with 5+ years of experience building scalable web applications. Passionate about teaching and mentoring aspiring developers.",
        skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
        social: {
            twitter: "johndoe",
            linkedin: "in/johndoe",
            github: "johndoe"
        },
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    });

    const [editForm, setEditForm] = useState({ ...mentor });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setMentor(editForm);
        setIsEditModalOpen(false);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        console.log("Password changed:", passwordForm);
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setIsPasswordModalOpen(false);
    };

    const handleSkillChange = (skillsString) => {
        const skillsArray = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
        setEditForm({ ...editForm, skills: skillsArray });
    };

    return (
        <div className="min-h-screen max-w-6xl mx-auto rounded-lg my-2 bg-white p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Mentor Profile</h1>
                <p className="text-gray-500">Manage your profile information and settings</p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-md overflow-hidden">
                            <img
                                src={mentor.profileImage}
                                alt={mentor.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-1">{mentor.fullName}</h2>
                                <p className="text-gray-500 flex items-center gap-2">
                                    <FaEnvelope size={12} className="text-gray-400" />
                                    {mentor.email}
                                </p>
                            </div>
                            <div className="flex gap-3 mt-4 md:mt-0">
                                <button
                                    onClick={() => {
                                        setEditForm({ ...mentor });
                                        setIsEditModalOpen(true);
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    <FaEdit size={14} />
                                    Edit Profile
                                </button>
                                <button
                                    onClick={() => setIsPasswordModalOpen(true)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                                >
                                    <FaLock size={14} />
                                    Password
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                                    <FaBook size={12} className="text-gray-400" />
                                    Bio
                                </h3>
                                <p className="text-gray-700 leading-relaxed">{mentor.bio}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Skills & Expertise</h3>
                                <div className="flex flex-wrap gap-2">
                                    {mentor.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <button
                                    onClick={() => setShowSocialLinks(!showSocialLinks)}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium mb-2"
                                >
                                    {showSocialLinks ? 'Hide' : 'Show'} Social Links →
                                </button>
                                {showSocialLinks && (
                                    <div className="flex gap-4 mt-2">
                                        {mentor.social.twitter && (
                                            <a
                                                href={`https://twitter.com/${mentor.social.twitter}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                                            >
                                                <FaTwitter className="text-blue-400" />
                                                <span className="text-sm">@{mentor.social.twitter}</span>
                                            </a>
                                        )}
                                        {mentor.social.linkedin && (
                                            <a
                                                href={`https://linkedin.com/${mentor.social.linkedin}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                                            >
                                                <FaLinkedin className="text-blue-600" />
                                                <span className="text-sm">LinkedIn</span>
                                            </a>
                                        )}
                                        {mentor.social.github && (
                                            <a
                                                href={`https://github.com/${mentor.social.github}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                                            >
                                                <FaGithub className="text-gray-600" />
                                                <span className="text-sm">GitHub</span>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
                        </div>

                        <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={editForm.fullName}
                                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                <textarea
                                    value={editForm.bio}
                                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Skills (comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={editForm.skills.join(', ')}
                                    onChange={(e) => handleSkillChange(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="React, Node.js, MongoDB, etc."
                                />
                                <p className="text-xs text-gray-500 mt-2">Separate skills with commas</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                                    <input
                                        type="text"
                                        value={editForm.social.twitter}
                                        onChange={(e) => setEditForm({
                                            ...editForm,
                                            social: { ...editForm.social, twitter: e.target.value }
                                        })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="username"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                                    <input
                                        type="text"
                                        value={editForm.social.linkedin}
                                        onChange={(e) => setEditForm({
                                            ...editForm,
                                            social: { ...editForm.social, linkedin: e.target.value }
                                        })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="in/username"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                                    <input
                                        type="text"
                                        value={editForm.social.github}
                                        onChange={(e) => setEditForm({
                                            ...editForm,
                                            social: { ...editForm.social, github: e.target.value }
                                        })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="username"
                                    />
                                </div>
                            </div>
                        </form>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Change Password Modal */}
            {isPasswordModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
                        </div>

                        <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>
                        </form>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={() => setIsPasswordModalOpen(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePasswordSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;