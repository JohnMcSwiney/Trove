/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        trv :{
          'Purple':'#8650F4',
          'Blue': '#0034C4',
          'D_Blue': '#080C3D',
          'Black': '#000000',
          'White': '#FFFFFF',
          'sm':{
            'Play-bg': '#12164B',
            'Song-txt': '#ffffff',
            'Artist-txt': '#878694',
          },
          'lg':{

          }
        
        }
        
      },
  
      fontFamily: {
        body: ['Poppins']
      },
      screens: {
        'phone_sm': '300px',

        'phone_md': '370px',
  
        'phone_lg': '380px'
        // {
        //   @media (min-width: 350px)
        // }
      }
    },
  },
  plugins: [],
}
