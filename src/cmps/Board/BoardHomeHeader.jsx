export function BoardHomeHeader() {


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

    return <section className="board-home-header"
        style=
        {{
            display: 'grid',
            gridAutoFlow: 'column',
            width: '100%',
            gridTemplateColumns: '1fr 1fr 1fr'
        }}
    >
        <section
            style={{ justifySelf: 'start' }}
            className="welcome-user-container">
            <span>{`${welcomeUser()}, User!`}</span>
            <p 
            className="welcome-user-content"
            >Quickly access your recent boards, Inbox and workspaces</p>
        </section>

        <img
            src="https://cdn.monday.com/images/homepage-desktop/header-background-v2.svg"
            style={{
                maxWidth: '100%',
                maxHeight: '100%',
                justifySelf: 'center',
                overflow: 'hidden'
            }}
        />
    </section>
}