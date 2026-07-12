import "./BuilderContainer.css";
import StepAccordion from "../StepAccordion/StepAccordion.jsx";
import ProductGrid from "../ProductGrid/ProductGrid.jsx";
import { productsData } from "../../../store/bundleStore.js";

const BuilderContainer = () => {
  const steps = productsData.steps;

  const getProductsForStep = (stepId) => {
    return productsData.products.filter((p) => p.stepId === stepId);
  };

  return (
    <section className="builder-container">
      {steps.map((step, index) => {
        const nextStep = steps[index + 1];
        return (
          <StepAccordion
            key={step.id}
            stepNumber={step.id}
            title={step.title}
            icon={step.icon}
            nextStepTitle={nextStep?.title || null}
          >
            <ProductGrid products={getProductsForStep(step.id)} />
          </StepAccordion>
        );
      })}
    </section>
  );
};

export default BuilderContainer;
