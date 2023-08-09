import "./globals.css";
import ErrorContext from "../context/errorhandler";
export const metadata = {
  title: "Messanger",
  description: "A Full Stack messanging App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ErrorContext />
        {children}
      </body>
    </html>
  );
}
