import { Github, Twitter } from "lucide-react";

const links = [
  { name: "AA Repository", link: "https://github.com/eth-infinitism/account-abstraction" },
  { name: "EIP4337", link: "https://eips.ethereum.org/EIPS/eip-4337" },
  { name: "Stackup", link: "https://www.stackup.sh/" },
  { name: "Vitlik Blog", link: "https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap" },
];

export const Footer = () => {
  return (
    <footer className="p-8 max-w-screen-lg w-full mx-auto h-48 border-t flex gap-8 justify-between">
      <div>
        <div className="text-lg text-muted-foreground font-bold">SOCIAL</div>
        <div className="flex gap-2">
          <a href="https://twitter.com/inaridiy" className="p-2 rounded-lg hover:bg-accent ">
            <Twitter className="w-8 h-8" />
          </a>
          <a
            href="https://github.com/inaridiy/learn-account-abstraction"
            className="p-2 rounded-lg hover:bg-accent "
          >
            <Github className="w-8 h-8" />
          </a>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-lg text-muted-foreground font-bold">LINKS</div>
        <ul className="flex flex-col">
          {links.map(({ name, link }) => (
            <li key={name}>
              <a href={link} className="text-lg text-muted-foreground hover:underline">
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
