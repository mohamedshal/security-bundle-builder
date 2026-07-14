import { useMemo } from "react";
import "./StepAccordion.css";
import { useBundleStore, calcStepSelectedCount } from "../../../store/bundleStore.js";

const StepAccordion = ({ stepNumber, title, icon, nextStepTitle, children }) => {
  const activeStep = useBundleStore((s) => s.activeStep);
  const setActiveStep = useBundleStore((s) => s.setActiveStep);
  const nextStep = useBundleStore((s) => s.nextStep);
  const quantities = useBundleStore((s) => s.quantities);

  const isOpen = activeStep === stepNumber;
  const selectedCount = useMemo(() => calcStepSelectedCount(stepNumber, quantities), [stepNumber, quantities]);
  const isLast = stepNumber === 4;
  const iconSrc = typeof icon === "string" ? icon.replace(/^\.\/(.*)/, "/$1") : "";

  const handleHeaderClick = () => {
    setActiveStep(stepNumber);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    nextStep();
  };

  return (
    <div className={`step-accordion ${isOpen ? "active" : ""}`}>
      <div className="step-header" onClick={handleHeaderClick}>
        <div className="step-left">
          <span className="step-number">STEP {stepNumber} OF 4</span>
          <div className="step-title">
            <span className="step-icon">
              <img src={iconSrc} alt={`${title} icon`} />
            </span>
            <h3>{title}</h3>
          </div>
        </div>

        <div className="step-right">
          {isOpen && (
            <span className="selected-count">
              {selectedCount} selected
            </span>
          )}
          <span className="arrow">{isOpen ? "\u2303" : "\u2304"}</span>
        </div>
      </div>

      {isOpen && (
        <div className="step-content">
          {children}
          {!isLast && (
            <div className="step-next">
              <button className="next-btn" onClick={handleNext}>
                Next: {nextStepTitle} &rarr;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StepAccordion;
