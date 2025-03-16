document.addEventListener('DOMContentLoaded', () => {
    const walletConnectButton = document.getElementById('wallet-connect');
    const walletDataContainer = document.getElementById('wallet-data');

    const conectarWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const cuentas = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const cuenta = cuentas[0];
                walletDataContainer.innerHTML = `Cuenta conectada: ${cuenta}`;
            } catch (error) {
                console.error('Error al conectar la wallet:', error);
                walletDataContainer.innerHTML = 'Error al conectar la wallet.';
            }
        } else {
            walletDataContainer.innerHTML = 'MetaMask no está instalado.';
        }
    };

    walletConnectButton.addEventListener('click', conectarWallet);
});
