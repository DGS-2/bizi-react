export default theme => ({
    root: {
      maxWidth: '100%',
      paddingTop: theme.spacing.unit * 3,
      paddingBottom: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 3,
      paddingLeft: theme.spacing.unit * 3
    },
    imageWrapper: {
      height: '64px',
      width: '64px',
      margin: '0 auto',
      border: '1px solid #EDF0F2',
      borderRadius: '5px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      width: '100%'
    },
    details: {},
    title: {
      fontSize: '18px',
      lineHeight: '21px',
      textAlign: 'center',
      marginTop: theme.spacing.unit * 2
    },
    description: {
      lineHeight: '16px',
      height: theme.spacing.unit * 4,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      color: theme.palette.text.secondary,
      textAlign: 'center',
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 2
    },
    stats: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: theme.spacing.unit
    },
    updateIcon: {
      color: theme.palette.text.secondary
    },
    updateText: {
      marginLeft: theme.spacing.unit,
      color: theme.palette.text.secondary
    },
    downloadsIcon: {
      marginLeft: 'auto',
      color: theme.palette.text.secondary
    },
    downloadsText: {
      marginLeft: theme.spacing.unit,
      color: theme.palette.text.secondary
    },
    chat: {
      margin:0,
      cursor:'default',
      position:'relative',
      minHeight: '15rem',
      left:0,
      right:0,
      bottom:0,
      top:0,
    },
    chatMessages: {
      display:'block',
      overflowX: 'hidden',
      overflowY: 'scroll',
      position:'inherit',
      height:'15rem',
      width:'100%',
      padding:'2% 3%',
      borderBottom:'1px solid #ecf0f1'
    },
    chatMessage: {
      display: 'block',
      width: '98%',
      padding: '.5%'
    },
    messageP: {
      margin: '0'
    },
    messageBox: {
      width: '90%',
      wordWrap: 'break-word',
      marginBottom: '20px',
      position: 'absolute',
      color: 'white',
      borderRadius: '25px',
      clear: 'both',
      font: '400 15px "Open Sans", sans-serif'
    },
    myMessage: {
      background: '#3385ff',
      color: 'white',
      float: 'right',
      clear: 'both',
      margin: '.5rem',
      borderBottomRightRadius: '20px 0px',
      borderBottomLeftRadius: '15px',
      borderTopRightRadius: '15px',
      borderTopLeftRadius: '15px',
      padding: '1.5rem .5rem',
      // '&:before': {
      //   content: '""',
      //   position: 'absolute',
      //   zIndex: 1,
      //   bottom: '-2px',
      //   right: '-8px',
      //   height: '19px',
      //   borderRight: '20px solid #3385ff',
      //   borderBottomLeftRadius: '16px 14px',
      //   transform: 'translate(0, -2px)',
      //   borderBottomLeftRadius: '15px 0',
      //   transform: 'translate(-1px, -2px)'
      // },
      // '&:after': {
      //   content: '""',
      //   position: 'absolute',
      //   zIndex: 1,
      //   bottom: '-2px',
      //   right: '-42px',
      //   width: '12px',
      //   height: '20px',
      //   background: 'white',
      //   borderBottomLeftRadius: '10px',
      //   transform: 'translate(-30px, -2px)'
      // }
    },
    myMessageDate: {
      right: '105%'
    },
    fromMessage: {
      background: '#E5E5EA',
      color: 'black',
      float: 'left',
      clear:'both',
      margin: '.5rem',
      borderBottomLeftRadius: '30px 0px',
      borderBottomRightRadius: '15px',
      borderTopRightRadius: '15px',
      borderTopLeftRadius: '15px',
      padding: '1.5rem .5rem',
      // '&:before': {
      //   content: '""',
      //   position: 'absolute',
      //   zIndex: 2,
      //   bottom: '-2px',
      //   left: '-7px',
      //   height: '19px',
      //   borderLeft: '20px solid #E5E5EA',
      //   borderBottomRightRadius: '16px 14px',
      //   transform: 'translate(0, -2px)',
      //   borderBottomRightRadius: '15px 0px',
      //   transform: 'translate(-1px, -2px)'
      // },
      // '&:after' : {
      //   content: '""',
      //   position: 'absolute',
      //   zIndex: 3,
      //   bottom: '-2px',
      //   left: '4px',
      //   width: '26px',
      //   height: '20px',
      //   background: 'white',
      //   borderBottomRightRadius: '10px',
      //   transform: 'translate(-30px, -2px)'
      // }
    },
    fromMessageDate: {
      left: '105%'
    },
    replyInput: {
      // font: '400 13px "Open Sans", sans-serif',
      // border: 0,
      // padding: '0 15px',
      // height: '10%',
      // outline: 0
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '90%',
      margin: '0 3rem'
    },
    replyText: {
      width: '90%',
      float: 'left'
    },
    replySend: {
      width: '8%',
      background: 'transparent',
      color: '#3385ff',
      fontWeight: '700',
      textAlign: 'right',
      float: 'right'
    }
  });