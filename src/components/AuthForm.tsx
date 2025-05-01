// import {
//     Avatar,
//     Box,
//     Button,
//     Container,
//     Input,
//     Tab,
//     Tabs,
//     TextField,
//     Typography,
// } from "@mui/material";
// import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     updateProfile,
// } from "firebase/auth";
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../firebase/config"; // adjust path if needed

// const AuthForm: React.FC = () => {
//   const [isSignup, setIsSignup] = useState<boolean>(false);
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [name, setName] = useState<string>(""); // New state for Name
//   const [image, setImage] = useState<File | null>(null); // New state for Profile Picture
//   const [imageUrl, setImageUrl] = useState<string>(""); // Store the URL of uploaded image
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       if (isSignup) {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         // If there's a profile picture, upload it to Firebase Storage
//         if (image) {
//           const storage = getStorage();
//           const storageRef = ref(storage, `profile_pictures/${userCredential.user.uid}`);
//           const uploadTask = uploadBytesResumable(storageRef, image);

//           uploadTask.on(
//             "state_changed",
//             () => {},
//             (error) => {
//               console.error("Upload failed:", error);
//             },
//             async () => {
//               const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//               setImageUrl(downloadURL); // Store the download URL
//               // Update user profile with name and profile picture
//               await updateProfile(userCredential.user, {
//                 displayName: name,
//                 photoURL: downloadURL,
//               });
//               alert("Signup successful");
//               setIsSignup(false); // Switch to login tab
//               navigate("/auth"); // Stay on login page after signup
//             }
//           );
//         } else {
//           // Update user profile with name only
//           await updateProfile(userCredential.user, {
//             displayName: name,
//           });
//           alert("Signup successful");
//           setIsSignup(false); // Switch to login tab
//           navigate("/auth"); // Stay on login page after signup
//         }
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//         alert("Login successful");
//         navigate("/"); // Redirect to home page after login
//       }
//     } catch (error: any) {
//       alert(error.message);
//     }
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file);
//     }
//   };

//   return (
//     <Container maxWidth="xs">
//       <Box sx={{ mt: 8 }}>
//         <Typography variant="h5" align="center" gutterBottom>
//           {isSignup ? "Sign Up" : "Login"}
//         </Typography>
//         <Tabs value={isSignup ? 1 : 0} onChange={() => setIsSignup(!isSignup)} centered>
//           <Tab label="Login" />
//           <Tab label="Sign Up" />
//         </Tabs>
//         <form onSubmit={handleSubmit}>
//           {isSignup && (
//             <Box>
//               <Avatar
//                 sx={{ width: 100, height: 100, margin: "auto", mb: 2 }}
//                 src={imageUrl || undefined}
//               />
//               <Input
//                 type="file"
//                 onChange={handleImageChange}
//                 fullWidth
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Name"
//                 type="text"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </Box>
//           )}
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Email"
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Password"
//             type="password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//             {isSignup ? "Sign Up" : "Login"}
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default AuthForm;


import {
    Box,
    Button,
    Container,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config"; // adjust path if needed
  
  const AuthForm: React.FC = () => {
    const [isSignup, setIsSignup] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>(""); // For signup
    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (isSignup) {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          // Update user profile with display name only (no image)
          await updateProfile(userCredential.user, {
            displayName: name,
          });
          alert("Signup successful");
          setIsSignup(false); // Switch to login tab
          navigate("/auth"); // Stay on login page after signup
        } else {
          await signInWithEmailAndPassword(auth, email, password);
          alert("Login successful");
          navigate("/"); // Redirect to home page
        }
      } catch (error: any) {
        alert(error.message);
      }
    };
  
    return (
      <Container maxWidth="xs">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" align="center" gutterBottom>
            {isSignup ? "Sign Up" : "Login"}
          </Typography>
          <Tabs value={isSignup ? 1 : 0} onChange={() => setIsSignup(!isSignup)} centered>
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              {isSignup ? "Sign Up" : "Login"}
            </Button>
          </form>
        </Box>
      </Container>
    );
  };
  
  export default AuthForm;
  
  
