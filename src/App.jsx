import Header from "./components/Header";
import Hero from "./components/Hero";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-hero lg:h-screen md:h-screen xl:overflow-auto">
        <Header />
        <Hero />
      </div>
    </div>
  );
};

export default App;
