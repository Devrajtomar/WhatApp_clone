import "./globals.css";
import { SocketProvider } from "../providers/socket-provider";
import { PreviewProvider } from "../providers/Preview-Provider";
import ErrorContext from "../context/errorhandler";
export const metadata = {
  title: "Messanger",
  description: "A Full Stack messanging App",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://meet.jit.si/external_api.js"></script>
      </head>
      <body id="body">
        <SocketProvider>
          <PreviewProvider>
            <ErrorContext />
            {children}
          </PreviewProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
