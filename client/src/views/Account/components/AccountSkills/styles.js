export default theme => ({
    root: {
        width: '100%',
        padding: '2rem'
    },
    field: {
        margin: theme.spacing(3)
    },
    textField: {
        width: '420px',
        maxWidth: '100%',
        marginRight: theme.spacing(3)
    },
    portletFooter: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    gridList: {
        width: 500,
        height: 100,
    },
    gridContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    }
});