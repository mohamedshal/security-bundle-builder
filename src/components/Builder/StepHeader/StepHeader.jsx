import "./StepHeader.css";

const StepHeader = ({ stepNumber, title, icon, isSelected, isOpen, onToggle }) => {
  return (
    <div className={`step-header ${isOpen ? "open" : ""}`} onClick={onToggle}>
      <div className="step-left">
        <span className="step-number">STEP {stepNumber} OF 4</span>
        <div className="step-title">
          <span className="step-icon">{icon}</span>
          <h3>{title}</h3>
        </div>
      </div>
      <div className="step-right">
        {isOpen && isSelected > 0 && (
          <span className="selected-count">{isSelected} selected</span>
        )}
        <span className="arrow">{isOpen ? "⌃" : "⌄"}</span>
      </div>
    </div>
  );
};

export default StepHeader;
