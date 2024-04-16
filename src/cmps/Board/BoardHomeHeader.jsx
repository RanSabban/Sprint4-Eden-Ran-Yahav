export function BoardHomeHeader(screenWidth) {


    function welcomeUser() {
        const currentHour = new Date().getHours();
        let greeting;

        if (currentHour >= 5 && currentHour < 12) {
            greeting = "Good morning";
        } else if (currentHour >= 12 && currentHour < 18) {
            greeting = "Good afternoon";
        } else {
            greeting = "Good evening";
        }

        return greeting
    }

    return screenWidth > 880 && <section className="board-home-header"    >
        <section
            style={{ justifySelf: 'start' }}
            className="welcome-user-container">
            <span>{`${welcomeUser()}, Guest!`}</span>
            <p
                className="welcome-user-content"
            >Quickly access your recent boards, Inbox and workspaces</p>
        </section>

        <img
            src="https://cdn.monday.com/images/homepage-desktop/header-background-v2.svg"
        />
    </section>
}