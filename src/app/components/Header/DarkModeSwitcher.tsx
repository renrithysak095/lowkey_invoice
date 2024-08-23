import useColorMode from "@/app/hooks/useColorMode";
import { Switch } from "@nextui-org/react";
import { Moon, Sun1 } from "iconsax-react";

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <li>
      <Switch
        defaultSelected
        size="lg"
        color="default"
        onValueChange={() => {
          if (typeof setColorMode === "function") {
            setColorMode(colorMode === "light" ? "dark" : "light");
          }
        }}
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <Sun1 className={className} size={16} />
          ) : (
            <Moon className={className} size={16} />
          )
        }
      >
      </Switch>
    </li>
  );
};

export default DarkModeSwitcher;
