import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";

const createUserSchema = Yup.object().shape({
  username: Yup.string().required("Nombre de usuario es requerido"),
  email: Yup.string().email("Email invalido").required("Email es requerido"),
  role: Yup.string().required("Rol es requerido"),
});

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Nombre de usuario es requerido"),
  email: Yup.string().email("Email invalido").required("Email es requerido"),
});

const createUserInitialValues = {
  username: "",
  email: "",
  role: "",
};

const loginInitialValues = {
  username: "",
  email: "",
};

export function Login() {
  const navigate = useNavigate();
  const handleCreateUser = async (values, { setSubmitting }) => {
    const response = await fetch(`http://localhost:8000/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      Swal.fire({
        title: "Error",
        text: await response.json(),
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      localStorage.setItem("PERMISSION", values.role);

      navigate("/");
    }

    setSubmitting(false);
  };

  const handleLogin = async (values, { setSubmitting }) => {
    const response = await fetch(`http://localhost:8000/api/users`).then(
      (res) => res.json()
    );

    const findUser = response.find(
      (user) => user.email === values.email && user.username === values.username
    );

    if (!findUser)
      Swal.fire({
        title: "Error",
        text: "Usuario inexistente!",
        icon: "error",
        confirmButtonText: "OK",
      });

    localStorage.setItem("PERMISSION", findUser.role);

    findUser && navigate("/");

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl flex space-x-8">
        <div className="w-1/2">
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Crear Usuario</h2>
            <Formik
              initialValues={createUserInitialValues}
              validationSchema={createUserSchema}
              onSubmit={handleCreateUser}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="create-username"
                      className="block text-sm font-medium mb-1"
                    >
                      Nombre de Usuario
                    </label>
                    <Field
                      type="text"
                      name="username"
                      id="create-username"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ingresar usuario"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="create-email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="create-email"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ingresar email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium mb-1"
                    >
                      Rol
                    </label>
                    <Field
                      as="select"
                      name="role"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Elegir rol</option>
                      <option value="LECTOR">Lector</option>
                      <option value="CREADOR">Creador</option>
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {isSubmitting ? "Creando..." : "Crear Usuario"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className="w-1/2">
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <Formik
              initialValues={loginInitialValues}
              validationSchema={loginSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="login-username"
                      className="block text-sm font-medium mb-1"
                    >
                      Nombre de Usuario
                    </label>
                    <Field
                      type="text"
                      name="username"
                      id="login-username"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ingresar Usuario"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="login-email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="login-email"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ingresar email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
