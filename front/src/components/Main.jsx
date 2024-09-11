import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const themes = [
  { id: "MATEMÁTICAS", name: "Matemáticas" },
  { id: "CIENCIAS", name: "Ciencias" },
  { id: "DEPORTE", name: "Deportes" },
];

export function Main() {
  const [content, setContent] = useState([]);
  const [sent, setSent] = useState(0);
  const [actualTheme, setActualTheme] = useState("");
  const [filtName, setFiltName] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/content")
      .then((res) => res.json())
      .then((data) => {
        let filteredData = data;
        if (actualTheme) {
          filteredData = data.filter(
            (content) => content.theme?.name === actualTheme
          );
        }
        if (filtName) {
          filteredData = filteredData.filter((content) =>
            content.media.toLowerCase().includes(filtName.toLowerCase())
          );
        }
        setContent(filteredData);
      });
  }, [sent, actualTheme, filtName]);

  const handleActualTheme = (theme) => {
    setActualTheme(theme);
    setFiltName("");
  };

  const nameFilterFormik = useFormik({
    initialValues: { name: "" },
    onSubmit: ({ name }) => {
      setFiltName(name);
      setActualTheme("");
      nameFilterFormik.resetForm();
    },
  });

  const contentSubmitFormik = useFormik({
    initialValues: {
      file: "",
      option: "url",
      url: "",
      theme: "MATEMÁTICAS",
    },
    onSubmit: async (values) => {
      const form = new FormData();
      if (values.option === "file") {
        form.set("file", values.file);
      } else {
        form.set("file", values.url);
      }

      try {
        const theme = await fetch(`http://localhost:8000/api/theme`).then(
          (res) => res.json()
        );
        const matchTheme = theme.find((t) => t.name === values.theme);

        const response = await fetch(
          `http://localhost:8000/api/content/66e0407fefcac6656dbf3f05/${matchTheme?._id}`,
          {
            method: "POST",
            body: form,
          }
        );

        if (response.ok) {
          Swal.fire({
            title: "¡Éxito!",
            text: "El contenido se ha enviado correctamente.",
            icon: "success",
            confirmButtonText: "OK",
          });

          contentSubmitFormik.resetForm({
            values: {
              file: values.option === "file" ? values.file : "",
              url: "",
              theme: values.theme,
              option: values.option,
            },
          });

          setSent((prev) => prev + 1);
        } else {
          throw new Error(await response.json());
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <main className="container mx-auto pt-8 p-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Filtros</h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Por temática</h3>
            <ul className="flex space-x-4">
              {themes.map((theme) => (
                <li
                  key={theme.id}
                  onClick={() => handleActualTheme(theme.id)}
                  className={`cursor-pointer px-4 py-2 rounded ${
                    actualTheme === theme.id
                      ? "bg-blue-500"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {theme.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Por nombre</h3>
            <form
              onSubmit={nameFilterFormik.handleSubmit}
              className="flex space-x-2"
            >
              <input
                type="text"
                name="name"
                onChange={nameFilterFormik.handleChange}
                value={nameFilterFormik.values.name}
                className="flex-grow px-3 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese nombre"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
              >
                Filtrar
              </button>
            </form>
          </div>
        </div>
        {localStorage.getItem("PERMISSION") === "CREADOR" && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Enviar contenido</h2>
            <form
              onSubmit={contentSubmitFormik.handleSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tipo de contenido
                </label>
                <select
                  name="option"
                  onChange={contentSubmitFormik.handleChange}
                  value={contentSubmitFormik.values.option}
                  className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="url">URL</option>
                  <option value="file">Archivo</option>
                </select>
              </div>
              {contentSubmitFormik.values.option === "url" ? (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    URL de YouTube
                  </label>
                  <input
                    type="text"
                    name="url"
                    onChange={contentSubmitFormik.handleChange}
                    value={contentSubmitFormik.values.url}
                    className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ingrese URL de YouTube"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Archivo
                  </label>
                  <input
                    type="file"
                    name="file"
                    accept="image/png, image/jpeg, text/plain"
                    onChange={(event) => {
                      contentSubmitFormik.setFieldValue(
                        "file",
                        event.currentTarget.files[0]
                      );
                    }}
                    className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">Tema</label>
                <select
                  name="theme"
                  onChange={contentSubmitFormik.handleChange}
                  value={contentSubmitFormik.values.theme}
                  className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {themes.map((theme) => (
                    <option key={theme.id} value={theme.id}>
                      {theme.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
              >
                Enviar
              </button>
            </form>
          </div>
        )}

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Contenido</h2>
          <div className="space-y-4">
            {content.map((file) => (
              <div key={file._id} className="bg-gray-700 p-4 rounded">
                <h3
                  className={`text-lg font-semibold  ${
                    !file.media.split("-")[0].includes("youtube") &&
                    "capitalize"
                  }`}
                >
                  {file.media.split("-")[0].includes("youtube")
                    ? `URL: ${file.media.split("-")[0]}`
                    : `Nombre del archivo: ${file.media.split("-")[0]}`}
                </h3>
                {!file.media.split("-")[0].includes("youtube") ? (
                  <a
                    href={`http://localhost:8000/api/content/${
                      file.category === "TXT" ? "txt" : "media"
                    }/${file.media}`}
                    target="_blank"
                    className="underline hover:text-black text-lg"
                  >
                    Ver archivo
                  </a>
                ) : (
                  <a
                    href={`${file.media}`}
                    target="_blank"
                    className="underline hover:text-black text-lg"
                  >
                    Ir a youtube
                  </a>
                )}

                <p className="text-sm text-gray-400">
                  Créditos: {file.user.username}
                </p>
                <p className="text-sm text-gray-400 capitalize">
                  Tema: {file.theme.name.toLowerCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
