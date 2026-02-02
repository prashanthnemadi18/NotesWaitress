# 📚 NotesWaitress - VTU Engineering Notes Platform

A modern, beautifully animated web application for organizing and accessing engineering college notes across all major branches and semesters at Visvesvaraya Technological University (VTU).

## 📖 Overview

NotesWaitress is a comprehensive digital notes repository designed specifically for VTU engineering students. It provides easy access to notes, study materials, and resources for all engineering disciplines across all 8 semesters. The platform features a modern, user-friendly interface with smooth animations and a responsive design.

## ✨ Key Features

- 🎨 **Modern UI/UX** - Beautiful gradient designs with smooth animations and transitions
- 🔐 **Authentication System** - Secure login with user profiles and session management
- 📂 **Well-Organized Structure** - Hierarchical organization: Department → Semester → Subject
- 🎭 **Smooth Animations** - Framer Motion-powered animations for enhanced user experience
- 📱 **Fully Responsive** - Seamlessly works on desktop, tablet, and mobile devices
- 🚀 **Lightning Fast** - Built with React + Vite for optimal performance
- 🎯 **Breadcrumb Navigation** - Easy navigation with breadcrumb trail
- 📄 **File Browsing** - View and download PDF and document files directly
- 🌈 **Color-Coded** - Different color schemes for easy visual identification

## 🎓 Supported Engineering Branches

The platform supports **8 major engineering disciplines** with complete coverage of all 8 semesters:

| Branch | Full Name | Subjects |
|--------|-----------|----------|
| **CSE** | Computer Science Engineering | Data Structures, DBMS, OOP, etc. |
| **ECE** | Electronics & Communication Engineering | Digital Circuits, Signals & Systems, etc. |
| **Mechanical** | Mechanical Engineering | Thermodynamics, CAD, Fluid Mechanics, etc. |
| **Civil** | Civil Engineering | Structural Analysis, Surveying, etc. |
| **EEE** | Electrical & Electronics Engineering | Power Systems, Control Systems, etc. |
| **IT** | Information Technology | Software Engineering, Networking, etc. |
| **AI-ML** | Artificial Intelligence & Machine Learning | Deep Learning, Computer Vision, Data Mining, etc. |
| **Chemical** | Chemical Engineering | Process Control, Mass Transfer, etc. |

**Total Coverage:** 320+ subject folders with 8 semesters each

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/prashanthnemadi18/NotesWaitress.git
cd NotesWaitress

# Install dependencies
npm install

# Start the development server
npm run dev

# Open in browser
# Navigate to http://localhost:5173
```

### Building for Production

```bash
# Build the production bundle
npm run build

# Preview the production build locally
npm run preview
```

## 📝 How to Add Notes

### Directory Structure

```
public/notes/
├── [Department]/
│   ├── 1st-Semester/
│   │   └── [Subject Name]/
│   │       ├── lecture1.pdf
│   │       ├── notes.pdf
│   │       └── assignments.pdf
│   ├── 2nd-Semester/
│   └── ...
```

### Step-by-Step Instructions

1. **Navigate to the appropriate folder:**
   ```
   NotesWaitress/public/notes/[Department]/[Semester]/[Subject]/
   ```
   Example: `NotesWaitress/public/notes/CSE/1st-Semester/Data Structures/`

2. **Add PDF or document files** to the subject folder

3. **(Optional) Update the structure file:**
   Edit `public/notes-structure.json` to maintain an index:
   ```json
   {
     "CSE": {
       "1st-Semester": {
         "Data Structures": ["lecture1.pdf", "lecture2.pdf", "notes.pdf"],
         "Programming in C": ["tutorial.pdf", "solution.pdf"]
       }
     }
   }
   ```

### Example: Adding CSE Notes

```bash
# Add notes to CSE 1st Semester Data Structures
# 1. Create folder if not exists: public/notes/CSE/1st-Semester/Data Structures/
# 2. Copy your PDF files into that folder
# 3. The platform will automatically detect and display them
```

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI Library | ^19.1.1 |
| **Vite** | Build Tool & Dev Server | ^7.1.7 |
| **Tailwind CSS** | Utility-First CSS Framework | ^3.4.17 |
| **Framer Motion** | Animation Library | ^12.23.22 |
| **Lucide React** | Icon Library | ^0.544.0 |
| **React Context API** | State Management | Built-in |
| **ESLint** | Code Quality | ^9.36.0 |

## 📁 Project Structure

```
NotesWaitress/
├── public/
│   ├── notes/                    # All notes organized by discipline/semester/subject
│   │   ├── AI-ML/
│   │   ├── Chemical/
│   │   ├── Civil/
│   │   ├── CSE/
│   │   ├── ECE/
│   │   ├── EEE/
│   │   ├── IT/
│   │   └── Mechanical/
│   └── notes-structure.json      # Structure metadata file
├── src/
│   ├── assets/                   # Static assets
│   ├── components/
│   │   ├── Breadcrumb.jsx        # Breadcrumb navigation component
│   │   ├── FileView.jsx          # File display component
│   │   ├── FolderView.jsx        # Folder display component
│   │   ├── Header.jsx            # Header/navigation component
│   │   └── LoginPage.jsx         # Authentication page
│   ├── context/
│   │   └── AuthContext.jsx       # Authentication state management
│   ├── App.jsx                   # Main application component
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Application entry point
├── index.html                    # HTML entry point
├── package.json                  # Project dependencies
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── eslint.config.js              # ESLint configuration
└── README.md                     # This file
```

## 🎨 UI/UX Features

- **Gradient Color Schemes** - Each folder has a unique color scheme for easy identification
- **Hover Animations** - Smooth hover effects on buttons and folders
- **Glassmorphism Effects** - Modern frosted glass effect on UI elements
- **Smooth Transitions** - Fluid page transitions and state changes
- **Loading States** - Visual feedback during file operations
- **Dark/Light Modes** - Optimized for different viewing preferences
- **Mobile-First Design** - Responsive layout that works on all screen sizes

## 🔒 Authentication

The platform includes a basic authentication system:

- **Login Page** - Secure user login interface
- **Session Management** - User sessions stored in context
- **Protected Routes** - Access control for authenticated users
- **User Profiles** - Basic user profile management

## 📊 Available Scripts

```bash
npm run dev       # Start development server with hot reload
npm run build     # Create optimized production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint code quality checks
```

## 🎯 Use Cases

- 📚 **Students** - Access notes and study materials anytime, anywhere
- 👨‍🏫 **Educators** - Share and organize course materials efficiently
- 📖 **Reference** - Quick access to course content during revision
- 💾 **Archive** - Maintain a centralized digital repository of notes
- 🤝 **Collaboration** - Share notes among study groups

## 🔄 Workflow

1. **Browse** - Navigate through departments and semesters
2. **Select** - Choose a subject from the available courses
3. **Access** - View all notes and materials in that subject
4. **Download** - Save documents locally if needed

## 📝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 To-Do & Future Enhancements

- [ ] Search functionality across all notes
- [ ] Bookmarking/favorites feature
- [ ] Note sharing with other users
- [ ] Document upload feature for authenticated users
- [ ] Comment section for each subject
- [ ] Download notes as ZIP files
- [ ] Mobile app (React Native)
- [ ] PDF viewer integration
- [ ] Advanced filtering and sorting
- [ ] Statistics and analytics dashboard

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Prashanth Nemadi**
- GitHub: [@prashanthnemadi18](https://github.com/prashanthnemadi18)
- Repository: [NotesWaitress](https://github.com/prashanthnemadi18/NotesWaitress)

## 🙏 Acknowledgments

- Inspired by the need for centralized note management in engineering colleges
- VTU for the standardized curriculum structure
- The open-source community for amazing tools and libraries

## 📞 Support

For issues, suggestions, or feedback:
- Open an issue on GitHub
- Check existing issues for solutions
- Contact the author directly

## 🎓 Educational Purpose

NotesWaitress is designed to support engineering education by providing organized access to study materials. Please use responsibly and respect copyright of original content.

---

**Last Updated:** February 2026
**Version:** 1.0.0
**Status:** Active Development
- Loading states with spinners
- Breadcrumb navigation

## 📝 License

MIT License - Feel free to use for your college!
