import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";

export function FaqSection() {
  return (
    <section id="faq">
      <Accordion type="single" collapsible style={{ width: "100%" }}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Vocês resgatam?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore quo
            repudiandae, ut, temporibus earum quisquam reiciendis quia
            consequuntur quas voluptatibus autem quam. Saepe necessitatibus
            laborum esse officia quas minima cupiditate!
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Posso visitar o abrigo?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore quo
            repudiandae, ut, temporibus earum quisquam reiciendis quia
            consequuntur quas voluptatibus autem quam. Saepe necessitatibus
            laborum esse officia quas minima cupiditate!
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            Como funciona o processo de adoção?
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore quo
            repudiandae, ut, temporibus earum quisquam reiciendis quia
            consequuntur quas voluptatibus autem quam. Saepe necessitatibus
            laborum esse officia quas minima cupiditate!
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}