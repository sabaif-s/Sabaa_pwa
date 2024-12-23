module.exports={
    theme: {
        borderRadius: {
          'none': '0',
          'sm': '0.125rem',
          DEFAULT: '0.25rem',
          DEFAULT: '4px',
          'md': '0.375rem',
          'lg': '0.5rem',
          'full': '9999px',
          'twelve':"12px",
          'large': '16px',
          'extraLarge':"30px"
        },
        extend: {
          colors: {
            sky: {
              50: "#f0f9ff",
              100: "#e0f2fe",
              200: "#bae6fd",
              300: "#7dd3fc",
              400: "#38bdf8",
              500: "#0ea5e9",
              600: "#0284c7",
              700: "#0369a1",
              800: "#075985",
              900: "#0c4a6e",
            },
          },
          keyframes: {
            fadeIn: {
              '0%': { opacity: '0' },
              '100%': { opacity: '1' },
            },
            fadeOut: {
              '0%': { opacity: '1' },
              '100%': { opacity: '0' },
            },
            fadeInOut: {
              '0%': { opacity: '0.5' },
              '50%':{opacity : '1'},
              '100%': { opacity: '0' },
            },
            shakeSlow:{
             '0%':{transform : "translateX(0)"},
             '50%':{transform : "translateX(30px)"},
             '100%':{transform :"translateX(0)"}
            },
            shakeSlowUp:{
              '0%':{transform : "translateY(0)"},
              '50%':{transform : "translateY(-30px)"},
              '100%':{transform :"translateY(0)"}
             },
             revolveDisappear:{
              '0%':{transform : "rotate(0)"},
              '90%':{transform : "rotateX(90deg)"},
              '100%':{display : "none", transform : "rotateX(90deg)"}
             },
            slideDown:{
             '0%':{transform : "translateY(-100%)"},
             '100%':{transform : "translateY(0)"}
            },
            slideUp:{
              '0%':{transform : "translateY(100%)"},
              '100%':{transform : "translateY(0)"}
             },
            slideRight:{
            '0%':{transform : "translateX(-100%)"},
            '100%':{transform : "translateX(0)"}
            },
            slideLeft:{
              '0%':{transform : "translateX(100%)"},
              '100%':{transform : "translateX(0)"}
              },
            bounce: {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-10px)' },
            },
            slideLeftRight:{
              '0%':{transform : 'translateX(0)'},
              '50%':{transform : 'translateX(20px)'},
              '100%':{transform : 'translateX(0)'}
            },
            slideUpDown:{
              '0%':{transform : 'translateY(0)'},
              '50%':{transform : 'translateY(20px)'},
              '100%':{transform : 'translateY(0)'}
            },
            colorChange: {
              '0%': { color: 'black' },      // Starting color (black)
              '50%': { color: 'red' },       // Midway color (red)
              '100%': { color: 'black' },    // Ending color (black)
            },
            colorChange2: {
              '0%': { color: 'gray' },      // Starting color (black)
              '50%': { color: 'white' },       // Midway color (red)
              '100%': { color: 'gray' },    // Ending color (black)
            },
            flip3D: {
              '0%': { transform: 'rotateY(0deg)', opacity:"0.5" },
              '50%': { transform: 'rotateY(180deg)' , opacity:"0.8"  },
              '100%': { transform: 'rotateY(360deg)',  opacity:"1"  },
            },
            flip3DB: {
              '0%': { transform: 'rotateY(360deg)' },
              '50%': { transform: 'rotateY(180deg)' },
              '100%': { transform: 'rotateY(0deg)' },
            },
            flipY: {
              '0%': { transform: 'rotateY(0deg)', opacity:"1" },
              '50%': { transform: 'rotateY(90deg)', opacity:"1" },
              '100%': { transform: 'rotateY(90deg)', opacity:"0.5" },
            },
            bgChange:{
              '0%': {
                backgroundColor: '#ff7eb3'
              },
              '50%': {
                backgroundColor: '#88d8b0'
              },
              '100%': {
                backgroundColor: '#ff7eb3'
              }
            },
            bgChange2:{
              '0%': {
                backgroundColor: '#49342f',
                 
              },
              '50%': {
                backgroundColor: '#9e675b',
                  
              },
              '100%': {
                backgroundColor: '#49342f',
                  
              }
            },
            bgChange3:{
              '0%': {
                backgroundColor: '#86d5fa'
              },
              '50%': {
                backgroundColor: '#9e675b '
              },
              '100%': {
                 backgroundColor: '#86d5fa'
              }
            },
            slideNext: {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(0)' },
            },
            pulse: {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
            },
            shake: {
              '0%, 100%': { transform: 'translateX(0)' },
              '25%': { transform: 'translateX(-2px)' },
              '75%': { transform: 'translateX(2px)' },
            },
           
          },
          animation: {
            fadeIn: 'fadeIn 1s ease-in-out ',
            fadeInSlow:"fadeIn 4s ease-in-out",
            fadeOut:'fadeOut 1s ease-in-out',
            bounce: 'bounce 0.5s infinite',
            slideDown:"slideDown 2s ease-in forwards",
            slideDownFast:"slideDown 1s ease-in forwards",
            slideUp:"slideUp 2s ease-in forwards",
            slideRight:"slideRight 2s ease-in forwards",
            slideLeft:"slideLeft 2s ease-in forwards",
            colorChange:"colorChange 20s ease-in infinite",
            colorChange2:"colorChange2 20s ease-in infinite",
            shakeSlow:"shakeSlow 2s ease-in forwards",
            shakeSlowUp:"shakeSlowUp 2s ease-in forwards",
            revolveDisappear:"revolveDisappear 2s ease-in forwards",
            slideLeftRight:"slideLeftRight 10s ease-in-out forwards",
             slideUpDown:"slideUpDown 10s ease-in-out forwards",
             slideUpDownFast:"slideUpDown 4s ease-in-out infinite",
             slideUpDownSlowInfinite:"slideUpDown 10s ease-in-out infinite",
             flip3d: 'flip3D 2s ease-in-out ',
             flip3dB: 'flip3DB 2s ease-in-out ',
             flipY:"flipY 4s ease-in-out forwards",
             fadeInOut:"fadeInOut 4s ease-in-out infinite",
             bgChange:"bgChange 4s ease-in-out infinite",
             bgChange2:"bgChange2 4s ease-in-out infinite",
             bgChange3:"bgChange3 4s ease-in-out infinite",
             slideNext: 'slideNext 0.5s ease-out ',
             notificationPulse: 'pulse 1.5s infinite', // Define custom pulse animation
            shake: 'shake 0.5s ease-in-out infinite'
          },
        
        },
      },
}