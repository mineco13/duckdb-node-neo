import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchCSV } from "~/duckdb";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export const loader = async () =>
  json(
    JSON.parse(
      JSON.stringify(await fetchCSV(), (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    )
  );
export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h1>
          <div className="h-[144px] w-[434px]">
            <img
              src="/logo-light.png"
              alt="Remix"
              className="block w-full dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="Remix"
              className="hidden w-full dark:block"
            />
          </div>
          <table>
            <caption>Data from Object Storage</caption>

            <tr>
              {data.header.map((header) => (
                <th scope="col">{header}</th>
              ))}
            </tr>
            {data.rows.map((row) => (
              <tr>
                {row.map((d) => (
                  <td scope="col">{d}</td>
                ))}
              </tr>
            ))}
          </table>
        </header>
      </div>
    </div>
  );
}
