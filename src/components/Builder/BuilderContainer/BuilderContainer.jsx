import StepAccordion from "../StepAccordion/StepAccordion.jsx";
import { productsData } from "../../../store/bundleStore.js";

const BuilderContainer = () => {
  return (
    <section className="flex flex-col gap-3 w-full max-md:w-full">
      {productsData.steps.map((step) => (
        <StepAccordion key={step.id} stepNumber={step.id} />
      ))}
    </section>
  );
};

export default BuilderContainer;
