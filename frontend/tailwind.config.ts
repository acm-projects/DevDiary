import type { Config } from 'tailwindcss';
import lineClamp from '@tailwindcss/line-clamp'

const config: Config = {
  
  theme: {
    extend: {
      colors: {
        customBg: '#011522',
      },
    
    },
  },
  plugins: [
        lineClamp,
      ],
}


export default config