import { Providers } from '@/store/provider';
import styles from './layout.module.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Instagram Messages Viewer</title>
      </head>
      <body style={{ margin: 0 }}>
          <Providers>
            <div className={styles.mainContainer}>
              <div className={styles.appContainer}>
                {children}
              </div>
            </div>
          </Providers>
      </body>
    </html>
  );
};
