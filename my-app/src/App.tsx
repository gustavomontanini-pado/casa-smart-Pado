import { useState, lazy, Suspense } from "react";
const NavBar = lazy(() => import("./components/Navbar.component.tsx"));
const IntroScreen = lazy(
  () => import("./components/IntroScreen.component.tsx"),
);
const FormScreen = lazy(() => import("./components/FormScreen.component.tsx"));
const Hero = lazy(() => import("./components/Hero.component.tsx"));
const RatingScreen = lazy(
  () => import("./components/RatingScreen.component.tsx"),
);
import "./App.css";

function App() {
  const [activeArea, setActiveArea] = useState("home");

  const [isExiting, setIsExiting] = useState(false);

  const [currentScreen, setCurrentScreen] = useState(() => {
    const savedData = localStorage.getItem("casaSmartUser");
    return savedData ? "form" : "intro";
  });

  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem("casaSmartUser");
    return savedData ? JSON.parse(savedData) : null;
  });

  const handleResetApp = () => {
    localStorage.removeItem("casaSmartUser");
    setUserData(null);
    setCurrentScreen("intro");
    setActiveArea("home");
  };

  const transitionTo = (screen: string) => {
    setIsExiting(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setIsExiting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* 1. OVERLAY SCREENS */}
      <Suspense fallback={<div>Loading...</div>}>
        {currentScreen === "intro" && (
          <IntroScreen
            onStart={() => transitionTo("app")}
            isExiting={isExiting}
          />
        )}
        {currentScreen === "form" && (
          <FormScreen
            onComplete={(data: string) => {
              setUserData(data);
              setCurrentScreen("rating");
            }}
            isExiting={isExiting}
            // ADD THIS LINE: Sends the user back to the main dashboard!
            onBack={() => {
              localStorage.removeItem("casaSmartUser");
              setUserData(null);
              setCurrentScreen("app");
            }}
          />
        )}
        {currentScreen === "rating" && (
          <RatingScreen
            userData={userData}
            onComplete={handleResetApp}
            isExiting={isExiting}
            onBack={() => {
              localStorage.removeItem("casaSmartUser");
              setUserData(null);
              setCurrentScreen("app");
            }}
          />
        )}
      </Suspense>

      {/* 2. THE MAIN APP */}
      {/* The empty tags <> and </> tell React to group these components without breaking the layout */}
      {currentScreen === "app" && (
        <>
          <main>
            <Hero activeArea={activeArea} />
          </main>

          <NavBar
            setActiveArea={setActiveArea}
            activeArea={activeArea}
            onFeedbackClick={() => setCurrentScreen("form")}
            onReset={handleResetApp}
          />
        </>
      )}
    </div>
  );
}

export default App;
