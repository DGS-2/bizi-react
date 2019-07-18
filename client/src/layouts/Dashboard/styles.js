export default theme => ({
    topbar: {
      position: 'fixed',
      width: '100%',
      top: 0,
      left: 0,
      right: 'auto',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    topbarShift: {
      marginLeft: '271px',
      width: 'calc(-271px + 100vw)'
    },
    drawerPaper: {
      zIndex: 1200,
      width: '271px'
    },
    sidebar: {
      width: '270px'
    },
    content: {
      marginTop: '64px',
      backgroundColor: theme.palette.background.primary,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      maxHeight: '95vh',
      minHeight: '85vh',
      height: '100%'
    },
    contentShift: {
      marginLeft: '270px'
    }
  });