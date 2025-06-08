import { useState } from "react";
import "./App.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

function App() {
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  function handleToggle(idx) {
    setOpen(!open);
    setOpenIndex(openIndex === idx ? null : idx);
  }
  return (
    <div>
      <Accordion onToggle={handleToggle} openIndex={openIndex} />
    </div>
  );
}

function Accordion({ onToggle, openIndex }) {
  return (
    <div className="accordion">
      {faqs.map((el, i) => (
        <AccordionItem
          ques={i + 1}
          title={el.title}
          onToggle={() => onToggle(i)}
          open={openIndex === i ? "open" : ""}
        >
          {el.text}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({ ques, title, children, onToggle, open }) {
  return (
    <div className={`item ${open ? "open" : ""}`} onClick={onToggle}>
      <p className="number">0{ques}</p>
      <p className="title">{title}</p>
      <p className="icon">{open ? "+" : "-"}</p>
      {open && <div className="content-box ">{children}</div>}
    </div>
  );
}

export default App;
