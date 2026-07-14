import { useMemo } from "react";
import "./StepAccordion.css";
import { useBundleStore, productsData, calcStepSelectedCount } from "../../../store/bundleStore.js";
import ProductGrid from "../ProductGrid/ProductGrid.jsx";

const StepAccordion = ({ stepNumber }) => {
  const activeStep = useBundleStore((s) => s.activeStep);
  const setActiveStep = useBundleStore((s) => s.setActiveStep);
  const nextStep = useBundleStore((s) => s.nextStep);
  const quantities = useBundleStore((s) => s.quantities);

  const step = productsData.steps.find((s) => s.id === stepNumber);
  const nextStepData = productsData.steps.find((s) => s.id === stepNumber + 1);

  const isOpen = activeStep === stepNumber;
  const selectedCount = useMemo(() => calcStepSelectedCount(stepNumber, quantities), [stepNumber, quantities]);
  const isLast = stepNumber === 4;
  const iconSrc = typeof step?.icon === "string" ? step.icon.replace(/^\.\/(.*)/, "/$1") : "";

  const handleHeaderClick = () => {
    setActiveStep(stepNumber);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    nextStep();
  };

  return (
    <div className={`step-accordion w-full transition-shadow ${isOpen ? "active" : ""}`}>
      <div className="step-header cursor-pointer select-none flex justify-between items-center" onClick={handleHeaderClick}>
        <div className="step-left flex flex-col gap-1">
          <span className="step-number text-[11px] font-semibold text-gray-400 tracking-wide uppercase">STEP {stepNumber} OF 4</span>
          <div className="step-title flex items-center gap-2">
            <span className="step-icon w-5 h-5 inline-flex items-center justify-center shrink-0">
              <img src={iconSrc} alt={`${step?.title} icon`} className="w-full h-full object-contain block" />
            </span>
            <h3 className="text-[17px] font-semibold text-gray-900">{step?.title}</h3>
          </div>
        </div>

        <div className="step-right flex items-center gap-3">
          {isOpen && (
            <span className="selected-count text-violet-600 text-[13px] font-medium">
              {selectedCount} selected
            </span>
          )}
          <span className="arrow text-violet-600 text-base font-semibold">{isOpen ? "\u2303" : "\u2304"}</span>
        </div>
      </div>

      {isOpen && (
        <div className="step-content flex flex-col items-center px-5 pb-5 pt-1">
          <ProductGrid stepId={stepNumber} />
          {!isLast && (
            <div className="step-next flex justify-end w-full mt-4 pt-4 border-t border-gray-100">
              <button className="next-btn bg-transparent border border-violet-700 text-violet-700 px-6 py-[10px] rounded-lg text-sm font-semibold cursor-pointer transition-colors hover:bg-violet-700 hover:text-white" onClick={handleNext}>
                Next: {nextStepData?.title} &rarr;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StepAccordion;
