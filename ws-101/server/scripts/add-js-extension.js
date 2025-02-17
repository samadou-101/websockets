import fs from "fs";
import path from "path";

function addJsExtensions(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      addJsExtensions(fullPath);
    } else if (path.extname(file) === ".js") {
      const content = fs.readFileSync(fullPath, "utf8");
      const modifiedContent = content.replace(
        /from\s+['"]([^'"]+)['"]/g,
        (match, p1) => {
          if (!p1.endsWith(".js") && !p1.startsWith(".")) return match;
          return match.replace(p1, p1.endsWith(".js") ? p1 : `${p1}.js`);
        }
      );

      fs.writeFileSync(fullPath, modifiedContent);
    }
  });
}

addJsExtensions("./dist");
