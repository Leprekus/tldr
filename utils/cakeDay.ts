    export default function cakeDay (unixDate: number) {
        const date = (new Date(unixDate * 1000)).toLocaleDateString()
        // mm dd yyyy
        const dateArr = date.split('/')
        let day = ''
       switch (dateArr[0]) {
        case '1':
          day = `January ${dateArr[1]}, ${dateArr[2]}`
          break;
        case '2':
          day = `February ${dateArr[1]}, ${dateArr[2]}`
          break;
        case '3':
          day = `March ${dateArr[1]}, ${dateArr[2]}`
          break;
        case '4':
          day = `April ${dateArr[1]}, ${dateArr[2]}`
          break;
        case '5':
          day = `May ${dateArr[1]}, ${dateArr[2]}`
          break;
        case '6':
            day = `June ${dateArr[1]}, ${dateArr[2]}`
          break;
        case '7':
            day = `July ${dateArr[1]}, ${dateArr[2]}`
          break;
        case '8':
          day = `August ${dateArr[1]}, ${dateArr[2]}`
          break;
        case '9':
          day = `September ${dateArr[1]}, ${dateArr[2]}`
          break;
         case '10':
          day = `October ${dateArr[1]}, ${dateArr[2]}`
          break;
         case '11':
          day = `November ${dateArr[1]}, ${dateArr[2]}`
          break;
         case '12':
          day = `December ${dateArr[1]}, ${dateArr[2]}`
          break;
        default:
            day = `${dateArr[1]} ${dateArr[1]}, ${dateArr[2]}`
          break;   
      }
        return day
    } 