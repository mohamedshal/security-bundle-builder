import "./SecurityBuilderPage.css";
import BuilderContainer from "../Builder/BuilderContainer/BuilderContainer.jsx";
import ReviewPanel from "../Review/ReviewPanel.jsx";

const SecurityBuilderPage = () => {
  return (
    <main className="security-builder">
      <BuilderContainer />
      <ReviewPanel />
    </main>
  );
};

export default SecurityBuilderPage;
