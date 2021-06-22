
export default (context) => {
    if (context?.req?.cookies?.token === undefined) {
        return {
            redirect: {
                permanent: false,
                destination: "/auth/login",
            },
            props: {},
        };
    }
}