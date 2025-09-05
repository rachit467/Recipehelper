import { Github, Instagram, Linkedin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#9cbbda] text-gray-700 py-3 mt-10 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
        {/* Credit in the middle */}
        <p className="text-sm">
          Made with ❤️ by{" "}
          <span className="font-semibold text-gray-900">Rachit Tachamo</span>
        </p>

        {/* Links section */}
        <div className="mt-2">
          <p className="text-sm font-medium mb-1">Find me on</p>
          <div className="flex space-x-4 justify-center text-sm">
            <a
              href="https://github.com/rachit467"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-gray-900 transition"
            >
              <Github size={14} /> GitHub
            </a>
            <a
              href="https://rachitnepaltravelguide.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-gray-900 transition"
            >
              <Globe size={14} /> Blog
            </a>
            <a
              href="https://www.instagram.com/rachit_tachamo/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-gray-900 transition"
            >
              <Instagram size={14} /> Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/rachit-tachamo-0083a02b4/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-gray-900 transition"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <p className="text-xs text-gray-600 mt-3">
          © {new Date().getFullYear()} Recipe_Helper. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
