const url = "https://go-wash-api.onrender.com/api/login";

async function loginUser() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "" || password === "") {
        alert("Por favor, preencha os campos de e-mail e senha.");
        return;
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                user_type_id: 1,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const responseApi = await response.json();

        if (
            responseApi.user &&
            responseApi.user.hasOwnProperty("is_active") &&
            responseApi.user.is_active === true
        ) {
            // Salva o token e o usuário no localStorage
            localStorage.setItem("user", JSON.stringify(responseApi.user));
            localStorage.setItem("token", responseApi.token);

            window.location.href = "profile.html";
            alert("Login feito com sucesso.");
        } else {
            alert(
                "Você não tem permissão para acessar esta página ou seu login ainda não foi ativado."
            );
        }
    } catch (error) {
        console.error("Erro ao fazer solicitação:", error);
        alert(
            "Erro ao processar a solicitação. Por favor, tente novamente mais tarde."
        );
    }
}

async function someAuthenticatedRequest() {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(
            "https://go-wash-api.onrender.com/api/some-endpoint",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Erro ao fazer solicitação:", error);
    }
}
