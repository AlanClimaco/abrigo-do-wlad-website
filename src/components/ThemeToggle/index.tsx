import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/Button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Verifica preferência salva no storage ou padrão do sistema ao iniciar
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    // Atualiza a classe no body e salva a preferência
    if (newTheme) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
      aria-label="Alternar tema"
    >
      {isDark ? (
        <Sun size={24} color="var(--text-primary)" />
      ) : (
        <Moon size={24} color="var(--text-primary)" />
      )}
    </Button>
  );
}