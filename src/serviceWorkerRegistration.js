
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.startsWith('127.') ||
    window.location.hostname.startsWith('192.168.')
);

export function register(config) {
    if ('serviceWorker' in navigator) {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

        if (isLocalhost) {
            checkValidServiceWorker(swUrl, config);
            navigator.serviceWorker.ready.then(() => {
                console.log('This web app is being served cache-first by a service worker.');
            });
        } else {
            registerValidSW(swUrl, config);
        }
    }
}

function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
            registration.onupdateavailable = () => {
                if (config && config.onUpdate) {
                    config.onUpdate(registration);
                }
            };
            registration.onupdatefound = () => {
                if (config && config.onUpdate) {
                    config.onUpdate(registration);
                }
            };
            registration.oncontrollerchange = () => {
                if (config && config.onSuccess) {
                    config.onSuccess(registration);
                }
            };
        })
        .catch((error) => {
            console.error('Error during service worker registration:', error);
        });
}

function checkValidServiceWorker(swUrl, config) {
    fetch(swUrl)
        .then((response) => {
            if (
                response.status === 404 ||
                response.headers.get('content-type').indexOf('javascript') === -1
            ) {
                navigator.serviceWorker.ready.then((registration) => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                registerValidSW(swUrl, config);
            }
        })
        .catch(() => {
            console.log('No internet connection found. App is running in offline mode.');
        });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
            registration.unregister();
        });
    }
}
