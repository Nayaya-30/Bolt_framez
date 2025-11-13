<!-- @format -->

# 📱 Framez - Social Media Mobile App

A modern, professional social media application built with React Native, Expo,
and Firebase.

## 🎯 Features

### ✅ Core Features (All Implemented)

- **User Authentication**

  - Email/Password signup and login
  - Persistent sessions
  - Password reset functionality
  - Secure authentication with Firebase

- **Posts Management**

  - Create posts with text and/or images
  - Image compression and optimization
  - Real-time post updates
  - Like, comment, share, and repost functionality
  - Delete own posts
  - Post statistics (likes, comments, shares, views)

- **User Profiles**

  - Customizable profile with avatar and cover photo
  - Display name and bio
  - Post count, followers, following stats
  - View own and other users' profiles
  - Edit profile functionality

- **Feed**
  - Chronological feed with latest posts
  - Pull to refresh
  - Infinite scroll with pagination
  - Real-time updates
  - Optimized performance

### 🎨 Design

- Instagram-inspired modern UI
- Gradient backgrounds and animations
- Professional color scheme (Indigo, Pink, Teal)
- Smooth transitions and animations
- Loading skeletons
- Empty states with guidance
- Touch feedback on all interactions

## 🛠️ Tech Stack

- **Frontend**: React Native 0.73 + Expo 50
- **Navigation**: React Navigation 6
- **State Management**: Zustand
- **Backend**: Firebase (Auth, Firestore, Storage)
- **UI Components**: Custom components with Expo Vector Icons
- **Animations**: React Native Animated API, Expo Linear Gradient
- **Image Handling**: Expo Image Picker, Expo Image Manipulator

## 📁 Project Structure

```
framez/
├── App.js                          # Main entry point
├── app.json                        # Expo configuration
├── package.json                    # Dependencies

```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac only) or Android Emulator
- Firebase account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd framez
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Firebase Setup**

   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project named "framez-app"
   - Enable Authentication (Email/Password)
   - Create Firestore Database (Start in test mode)
   - Enable Storage
   - Copy your Firebase config
   - Update `src/config/firebase.js` with your config

4. **Configure Firestore Rules**

   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read: if true;
         allow write: if request.auth != null && request.auth.uid == userId;
       }

       match /posts/{postId} {
         allow read: if true;
         allow create: if request.auth != null;
         allow update, delete: if request.auth != null &&
                                  resource.data.userId == request.auth.uid;
       }
     }
   }
   ```

5. **Configure Storage Rules**

   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /posts/{userId}/{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null && request.auth.uid == userId;
       }

       match /avatars/{userId}/{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

6. **Create Firestore Indexes**
   - Collection: `posts`
   - Fields: `createdAt` (Descending)
   - Composite: `userId` + `createdAt` (Descending)

### Running the App

1. **Start Expo**

   ```bash
   npx expo start
   ```

2. **Run on iOS Simulator**

   ```bash
   npm run ios
   ```

3. **Run on Android Emulator**

   ```bash
   npm run android
   ```

4. **Run on Physical Device**
   - Install Expo Go app from App Store/Play Store
   - Scan QR code from terminal

## 🧪 Testing

Test on both iOS and Android:

- Signup flow
- Login flow
- Create posts (text and images)
- Like/unlike posts
- View feed with pull to refresh
- Edit profile
- Upload profile/cover photos
- Logout

## 📦 Deployment

### Expo Go (Testing)

Already accessible via QR code when running `expo start`

### Appetize.io (Submission Requirement)

1. **Build APK**

   ```bash
   eas build --platform android --profile preview
   ```

2. **Upload to Appetize.io**
   - Go to [appetize.io](https://appetize.io)
   - Create account
   - Upload APK
   - Get shareable link

### Production Build

1. **Install EAS CLI**

   ```bash
   npm install -g eas-cli
   ```

2. **Configure EAS**

   ```bash
   eas build:configure
   ```

3. **Build**
   ```bash
   eas build --platform android
   eas build --platform ios
   ```

## 📝 Environment Variables

Create `.env` file (not committed):

```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

## 🐛 Known Issues & Future Enhancements

### Current Limitations

- Comments system (structure ready, needs full implementation)
- Search functionality
- Notifications
- Following/followers system
- Direct messaging

### Future Features

- Story/Reels functionality
- Advanced search and filters
- Push notifications
- Dark mode
- Multiple image posts
- Video support
- Hashtags and mentions
- User verification system

## 📄 License

This project is for educational purposes as part of HNG Internship Frontend Stage 4 assessment task.

## 👥 Author

[Yusuf Nayaya Bashir] [usouff.dev@gmail.com]

## 🙏 Acknowledgments

- Design inspired by Instagram
- Icons from Expo Vector Icons
- Firebase for backend services
- React Native community

---
