/* WaltLearn — starter library.
   Every topic has hand-written lessons in English and Hinglish.
   Add a topic by copying one block below; the UI picks it up automatically. */

const TOPICS = [
  {
    id: "networking",
    title: "Networking",
    accent: "#7c5cff",
    x: 24, y: 26,
    blurb: "How devices actually talk to each other, from Wi-Fi to the internet.",
    fact: "The first ARPANET message, sent in 1969, was meant to say LOGIN — the system crashed after LO.",
    links: ["python", "ai", "speaking"],
    lessons: [
      {
        title: "What a network actually is",
        mins: 12,
        bullets: {
          en: [
            "A network is just two or more devices that can send data to each other. Your phone and laptop on the same Wi-Fi already form one.",
            "A LAN is a small network in one place, like home or school. A WAN covers a large area — and the internet is the biggest WAN of all.",
            "The internet is not one machine. It is millions of networks agreeing to speak the same rules, and those rules are called protocols."
          ],
          hi: [
            "Network ka matlab simple hai: do ya zyada devices jo ek dusre ko data bhej sakte hain. Aapka phone aur laptop ek hi Wi-Fi par ho, toh woh already ek network hai.",
            "LAN chhota network hota hai, jaise ghar ya school. WAN bada area cover karta hai — aur internet duniya ka sabse bada WAN hai.",
            "Internet koi ek computer nahi hai. Yeh lakhon networks hain jo same rules par chalne ko ready hain, aur in rules ko protocols kehte hain."
          ]
        },
        note: {
          en: "Think of a network like a postal system: devices are houses, IP addresses are addresses, and protocols are the rules for writing an envelope so it arrives correctly.",
          hi: "Network ko dak system ki tarah samjho: devices ghar hain, IP address pata hai, aur protocol woh rule hai ki envelope kaise likhna hai taaki sahi jagah pahunche."
        },
        deep: {
          en: [
            "Packet switching is the key idea: a message is cut into packets, each packet carries the destination address and a sequence number, and routers forward them one by one. The receiver puts them back in order and asks for anything missing.",
            "A home network is a LAN; the internet is a WAN made of many LANs owned by different people. Your router is the border: inside it hands out private addresses, outside it uses the public address your ISP gave you.",
            "Protocols are layered on purpose. Wi-Fi moves bits between nearby devices, IP moves packets between networks, TCP repairs losses, and HTTP asks for a web page. Each layer only trusts the one below it, which is why switching from Wi-Fi to mobile data does not change the website."
          ],
          hi: [
            "Packet switching hi asli idea hai: message chhote packets mein tootta hai, har packet ke saath destination address aur sequence number hota hai, aur routers unhe ek-ek karke aage bhejte hain. Receiver unhe order mein jodta hai aur jo missing ho woh dobara maangta hai.",
            "Ghar ka network LAN hai; internet ek WAN hai jo kai alag-alag malik waale LANs se bana hai. Router border hai: andar private addresses baantta hai, bahar ISP ka diya public address use karta hai.",
            "Protocols jaan-boojh kar layers mein hain. Wi-Fi paas ke devices ke beech bits bhejta hai, IP networks ke beech packets, TCP loss sudhaarta hai, aur HTTP web page maangta hai. Har layer sirf neeche wali par bharosa karti hai, isliye Wi-Fi se mobile data par jaane par website nahi badalti."
          ]
        },
        master: {
          en: ["Case: a cafe shows full Wi-Fi bars but pages time out, while phones on mobile data work. Check in order: is DNS resolving, is the gateway reachable, is outbound port 443 allowed? Full bars only prove the radio link; they say nothing about the path past the router."],
          hi: ["Case: cafe mein Wi-Fi ke full bars hain par pages time out ho rahe hain, jabki mobile data par sab chal raha hai. Order se check karo: DNS resolve ho raha hai, gateway reachable hai, outbound port 443 allowed hai? Full bars sirf radio link batate hain; router ke aage ka rasta nahi."]
        },
        quiz: {
          q: { en: "Which statement about the internet is true?", hi: "Internet ke baare mein kaunsi baat sahi hai?" },
          options: {
            en: ["It is one giant computer", "It is many networks following shared rules", "It only works inside one country"],
            hi: ["Yeh ek bada computer hai", "Yeh kai networks hain jo same rules follow karte hain", "Yeh sirf ek desh mein chalta hai"]
          },
          answer: 1,
          why: {
            en: "The internet is a network of networks. No single computer runs it; shared protocols let them cooperate.",
            hi: "Internet networks ka network hai. Koi ek computer isko nahi chalata; same protocols ki wajah se sab cooperate karte hain."
          }
        }
      },
      {
        title: "IP addresses and DNS",
        mins: 12,
        bullets: {
          en: [
            "Every device on a network needs an address so data knows where to go. That address is the IP address, like 192.168.1.7 on your home Wi-Fi.",
            "Private IPs work inside your home. Your router shares one public IP with the internet, which is why the whole house looks like one address from outside.",
            "DNS is the phonebook of the internet: you type a name, DNS translates it into an IP address that computers can use."
          ],
          hi: [
            "Har device ko network par ek address chahiye, taaki data ko pata ho kahan jaana hai. Isko IP address kehte hain — ghar ke Wi-Fi par kuch aisa: 192.168.1.7.",
            "Private IP ghar ke andar kaam karta hai. Router ek public IP internet ke saath share karta hai, isliye bahar se poora ghar ek hi address dikhta hai.",
            "DNS internet ki phonebook hai. Aap ek naam likhte ho, DNS usko IP address mein badal deta hai jo computer samajh sakta hai."
          ]
        },
        note: {
          en: "If a site is slow for everyone on your Wi-Fi but fine on mobile data, the problem is often local DNS or the router — not the website.",
          hi: "Agar ek site aapke Wi-Fi par sabke liye slow hai par mobile data par theek hai, toh problem aksar local DNS ya router ki hoti hai — website ki nahi."
        },
        deep: {
          en: [
            "IPv4 has about 4.3 billion addresses, which ran out. NAT lets a whole home share one public address, and IPv6 adds a much larger supply. Private ranges such as 192.168.x.x and 10.x.x.x are never routed on the open internet.",
            "A DNS lookup is a chain: your device cache, then the resolver from your ISP or a public one like 1.1.1.1, then the root servers, the .com servers, and finally the site's own nameserver. Each answer has a TTL, so changes can take minutes or hours to spread.",
            "An IP address finds the machine; a port finds the service on it. HTTPS normally uses port 443 and DNS uses 53. That is how one server can run a website, email and a game at the same time."
          ],
          hi: [
            "IPv4 mein lagbhag 4.3 billion addresses the, jo khatam ho gaye. NAT se poora ghar ek public address share karta hai, aur IPv6 bahut zyada supply deta hai. 192.168.x.x aur 10.x.x.x jaise private ranges internet par kabhi route nahi hote.",
            "DNS lookup ek chain hai: pehle device ka cache, phir ISP ka ya 1.1.1.1 jaisa public resolver, phir root servers, .com servers, aur aakhir mein site ka apna nameserver. Har answer ka TTL hota hai, isliye badlav phailne mein minute ya ghante lag sakte hain.",
            "IP address machine dhoondhta hai; port us machine ki service. HTTPS aksar port 443 use karta hai aur DNS port 53. Isliye ek hi server par website, email aur game saath chal sakte hain."
          ]
        },
        master: {
          en: ["Case: you move a site to a new host and some users still see the old version. Their resolver cached the old address and the TTL has not expired. Lower the TTL a day before the move, keep the old host alive until it passes, and do not assume 'it works for me' means it is done."],
          hi: ["Case: site ko naye host par shift kiya aur kuch users ko purana version dikh raha hai. Unke resolver ne purana address cache kiya hai aur TTL khatam nahi hui. Move se ek din pehle TTL kam karo, purana host TTL nikalne tak chalta rakho, aur 'mere yahan chal raha hai' ko done mat samjho."]
        },
        quiz: {
          q: { en: "What does DNS do?", hi: "DNS kya karta hai?" },
          options: {
            en: ["Stores your passwords", "Turns a website name into an IP address", "Speeds up your Wi-Fi signal"],
            hi: ["Passwords save karta hai", "Website ke naam ko IP address mein badalta hai", "Wi-Fi signal tez karta hai"]
          },
          answer: 1,
          why: {
            en: "DNS maps human-friendly names to machine-friendly addresses. Without it you would have to remember numbers.",
            hi: "DNS insaan ke naam ko machine ke address se jodta hai. Iske bina aapko numbers yaad rakhne padte."
          }
        }
      },
      {
        title: "How a request travels",
        mins: 14,
        bullets: {
          en: [
            "When you open a site, your device sends a request through the router to your ISP, which forwards it across several networks until it reaches the server.",
            "Data is cut into small packets. They can take different routes and are put back in order at the other end — that is why one broken cable rarely kills the internet.",
            "Speed is limited by the slowest hop and by distance. Latency (ping) is the delay; bandwidth is how much data fits per second. They are different things."
          ],
          hi: [
            "Jab aap koi site kholte ho, aapka device router se ISP tak request bhejta hai. ISP usko kai networks se aage bhejta hai jab tak server tak na pahunche.",
            "Data chhote packets mein toot jaata hai. Har packet alag raste le sakta hai aur aakhir mein sahi order mein jod diya jaata hai. Isliye ek cable tootne se internet band nahi hota.",
            "Speed sabse slow hop aur distance se limit hoti hai. Latency (ping) delay hai, bandwidth batata hai ek second mein kitna data ja sakta hai. Dono alag cheezein hain."
          ]
        },
        note: {
          en: "Gaming needs low latency; streaming needs high bandwidth. A fast download speed does not fix a laggy game.",
          hi: "Gaming ko low latency chahiye; streaming ko high bandwidth. Tez download speed kharab game ko theek nahi karti."
        },
        deep: {
          en: [
            "Opening a site is several round trips: DNS to find the address, a TCP handshake (SYN, SYN-ACK, ACK) to open a connection, a TLS handshake for HTTPS, then the HTTP request and response. Each round trip costs time, which is why a nearby server feels faster.",
            "Latency is the delay for one packet to go and come back; bandwidth is how much can flow per second. A highway can carry many trucks (bandwidth) and still take two hours to reach the city (latency).",
            "TCP numbers every packet and resends lost ones, so downloads arrive complete. UDP skips that repair, which is why live video and games use it: a late frame is useless, so dropping it beats waiting."
          ],
          hi: [
            "Site kholne mein kai round trips lagte hain: DNS se address, TCP handshake (SYN, SYN-ACK, ACK) se connection, HTTPS ke liye TLS handshake, phir HTTP request aur response. Har round trip time khaata hai, isliye paas ka server tez lagta hai.",
            "Latency ek packet ke jaane-aane ki delay hai; bandwidth batata hai ek second mein kitna flow ho sakta hai. Highway par kai truck ja sakte hain (bandwidth) par city pahunchne mein do ghante lag sakte hain (latency).",
            "TCP har packet ko number karta hai aur kho gaya dobara bhejta hai, isliye download poora aata hai. UDP yeh repair nahi karta, isliye live video aur games isko use karte hain: late frame bekaar hai, intezaar se behtar drop karna hai."
          ]
        },
        master: {
          en: ["Case: a game lags while a 4K video streams smoothly. Bandwidth is fine; latency and jitter are not. Try wired, pause the stream, and test ping. Buying a faster plan would not fix a queue that is already full of packets."],
          hi: ["Case: 4K video smooth chal raha hai par game lag karta hai. Bandwidth theek hai; latency aur jitter nahi. Wired try karo, stream pause karo, ping test karo. Tez plan kharidne se woh queue theek nahi hogi jo already packets se bhari hai."]
        },
        quiz: {
          q: { en: "Why does the internet keep working when one cable breaks?", hi: "Ek cable tootne par internet band kyun nahi hota?" },
          options: {
            en: ["Because data never uses cables", "Because packets can take different routes", "Because Wi-Fi replaces cables"],
            hi: ["Kyunki data cables use nahi karta", "Kyunki packets alag-alag raste le sakte hain", "Kyunki Wi-Fi cables ki jagah le leta hai"]
          },
          answer: 1,
          why: {
            en: "Routing lets packets go around damage. The network is designed to survive parts of it failing.",
            hi: "Routing packets ko damage ke aas-paas se bhej deti hai. Network isliye bana hai ki kuch hissa fail hone par bhi chalta rahe."
          }
        }
      },
      {
        title: "Staying safe on the wire",
        mins: 12,
        bullets: {
          en: [
            "HTTPS encrypts the connection between you and the website, so someone on the same Wi-Fi cannot read your password. The padlock means encrypted, not trustworthy.",
            "Public Wi-Fi is risky for anything unencrypted. A VPN creates an encrypted tunnel, so the network only sees noise.",
            "Most attacks are social, not technical: fake login pages, urgent messages, and links that look almost right. Check the domain, not the design."
          ],
          hi: [
            "HTTPS aapke aur website ke beech connection ko encrypt karta hai, taaki same Wi-Fi par baitha koi aapka password na padh sake. Padlock ka matlab sirf 'encrypted' hai, 'trustworthy' nahi.",
            "Public Wi-Fi un cheezon ke liye risky hai jo encrypted nahi hain. VPN ek encrypted tunnel banata hai, toh network ko sirf noise dikhta hai.",
            "Zyadatar attack technical nahi, social hote hain: fake login page, dara dene wala message, aur lagbhag sahi dikhne wala link. Design nahi, domain check karo."
          ]
        },
        note: {
          en: "Typing the address yourself or using a bookmark beats clicking a link in a message. That one habit blocks most phishing.",
          hi: "Address khud type karna ya bookmark use karna, message ke link par click karne se behtar hai. Yeh ek habit zyadatar phishing rok deti hai."
        },
        deep: {
          en: [
            "HTTPS has three jobs: encrypt the traffic, detect tampering, and prove the site owns its certificate. The browser checks that certificate against a trusted authority and that the domain matches. A padlock on a scam domain is still a scam.",
            "Phishing usually copies the login page and changes one character in the domain, or uses a subdomain like paypal.com.secure-login.xyz. A password manager helps because it will not autofill on the wrong domain; two-factor codes and passkeys block most stolen-password attacks.",
            "On public Wi-Fi, HTTPS protects the content but not everything around it: the network can still see which sites you visit and when. A VPN shifts trust from the cafe to the VPN provider, so pick one you actually trust; updates and unique passwords matter more than the VPN."
          ],
          hi: [
            "HTTPS ke teen kaam hain: traffic encrypt karna, tampering pakadna, aur sabit karna ki site ka apna certificate hai. Browser certificate ko trusted authority se check karta hai aur domain match karta hai. Scam domain par padlock ho toh bhi scam hi hai.",
            "Phishing aksar login page copy karke domain mein ek character badal deta hai, ya paypal.com.secure-login.xyz jaisa subdomain use karta hai. Password manager madad karta hai kyunki galat domain par autofill nahi karta; two-factor codes aur passkeys chori hue password ke zyadatar attacks rok dete hain.",
            "Public Wi-Fi par HTTPS content bachata hai par sab kuch nahi: network phir bhi dekh sakta hai aap kaunsi sites aur kab kholte ho. VPN bharosa cafe se VPN provider par shift karta hai, isliye woh chuno jispar sach mein bharosa ho; updates aur unique passwords VPN se zyada matter karte hain."
          ]
        },
        master: {
          en: ["Case: a coworker sends a 'VPN update' link to fix slow Wi-Fi. Refuse on two counts: a VPN does not speed up Wi-Fi, and the link is a classic phishing pattern. Install only from the official store, and check the domain before typing a password."],
          hi: ["Case: coworker slow Wi-Fi theek karne ke liye 'VPN update' link bhejta hai. Do wajah se mana karo: VPN Wi-Fi tez nahi karta, aur link classic phishing pattern hai. Sirf official store se install karo, aur password type karne se pehle domain check karo."]
        },
        quiz: {
          q: { en: "You see a padlock on a website. What does it prove?", hi: "Website par padlock dikha. Yeh kya sabit karta hai?" },
          options: {
            en: ["The site is honest", "The connection is encrypted", "Your account is safe"],
            hi: ["Site imandaar hai", "Connection encrypted hai", "Aapka account safe hai"]
          },
          answer: 1,
          why: {
            en: "The padlock only says traffic is encrypted. A scam site can have one too.",
            hi: "Padlock sirf batata hai ki traffic encrypted hai. Ek scam site par bhi woh ho sakta hai."
          }
        }
      }
    ]
  },

  {
    id: "python",
    title: "Python",
    accent: "#2ee6d6",
    x: 50, y: 14,
    blurb: "Your first real programming language, learned by doing small things.",
    fact: "Python is named after the comedy group Monty Python, not the snake.",
    links: ["networking", "ai", "quantum"],
    lessons: [
      {
        title: "Talking to the computer",
        mins: 10,
        bullets: {
          en: [
            "`print(\"Hi\")` shows text on screen. Anything in quotes is a string — text, not maths.",
            "A variable is a name pointing at a value: `age = 21`. You choose the name; it should say what the value means.",
            "Python cares about types: `21` is a number, `\"21\"` is text. `21 + 1` is 22, but `\"21\" + \"1\"` is `\"211\"`."
          ],
          hi: [
            "`print(\"Hi\")` screen par text dikhata hai. Quotes ke andar jo hai woh string hai — text, maths nahi.",
            "Variable ek naam hai jo kisi value ko point karta hai: `age = 21`. Naam aap choose karte ho, aur woh batana chahiye ki value kya hai.",
            "Python types ka dhyaan rakhta hai: `21` number hai, `\"21\"` text hai. `21 + 1` = 22, lekin `\"21\" + \"1\"` = `\"211\"`."
          ]
        },
        note: {
          en: "Errors are normal. Read the last line of the error first — it usually names the exact problem.",
          hi: "Errors normal hain. Error ki last line pehle padho — woh aksar exact problem bata deti hai."
        },
        deep: {
          en: [
            "A string is text, an int is a whole number, and a float is a decimal. `type(21)` gives `int`; `type(\"21\")` gives `str`. Python will not silently add a number to text, which is why `age + 1` fails when age came from `input()`.",
            "`=` stores a value, `==` compares two values. Names are case-sensitive (`age` and `Age` are different), must start with a letter or underscore, and cannot contain spaces. Choose names you can still read a week later.",
            "`input()` always returns a string, even if the user types 21. Convert before doing maths: `age = int(input(\"Age? \"))`. If the user types words, that line raises `ValueError`; knowing the cause saves an hour of guessing."
          ],
          hi: [
            "String text hai, int poora number, aur float decimal. `type(21)` `int` deta hai; `type(\"21\")` `str` deta hai. Python chupke se number aur text nahi jodta, isliye `input()` se aaya age par `age + 1` fail hota hai.",
            "`=` value store karta hai, `==` do values compare karta hai. Naam case-sensitive hain (`age` aur `Age` alag), letter ya underscore se shuru hone chahiye, aur space nahi ho sakta. Aisa naam chuno jo ek hafte baad bhi samajh aaye.",
            "`input()` hamesha string deta hai, chahe user 21 type kare. Maths se pehle convert karo: `age = int(input(\"Age? \"))`. User shabd likhe toh `ValueError` aata hai; wajah pata hona ek ghanta bachata hai."
          ]
        },
        master: {
          en: ["Case: `age = input('Age? ')` then `age + 1` crashes. `input` returned text, so wrap it in `int(...)` and decide what happens when the user types nothing. When unsure, print `type(value)` before the failing line."],
          hi: ["Case: `age = input('Age? ')` ke baad `age + 1` crash karta hai. `input` ne text diya, isliye `int(...)` mein wrap karo aur decide karo ki user kuch na likhe toh kya ho. Confusion ho toh failing line se pehle `type(value)` print karo."]
        },
        quiz: {
          q: { en: "What is printed by `print(\"21\" + \"1\")`?", hi: "`print(\"21\" + \"1\")` kya print karega?" },
          options: {
            en: ["22", "211", "An error"],
            hi: ["22", "211", "Error"]
          },
          answer: 1,
          why: {
            en: "Two strings joined together give one longer string, not a sum.",
            hi: "Do strings jud kar ek lambi string banti hain, sum nahi."
          }
        }
      },
      {
        title: "Decisions and loops",
        mins: 12,
        bullets: {
          en: [
            "`if` runs code only when something is true: `if score > 50: print(\"pass\")`. Indentation is part of the syntax, not decoration.",
            "`for` repeats over a collection; `while` repeats while a condition holds. Use `for` when you know the list, `while` when you are waiting for something to change.",
            "A loop needs a way to stop, or it runs forever. In a `while`, make sure something inside changes the condition."
          ],
          hi: [
            "`if` sirf tab code chalata hai jab condition sach ho: `if score > 50: print(\"pass\")`. Indentation syntax ka hissa hai, decoration nahi.",
            "`for` kisi collection par repeat karta hai; `while` tab tak repeat karta hai jab tak condition sach hai. List pata ho toh `for`, intezaar ho toh `while`.",
            "Loop ko rukne ka rasta chahiye, warna woh infinite chalega. `while` mein andar kuch aisa badlo jo condition ko false kare."
          ]
        },
        note: {
          en: "If a loop runs forever, press Ctrl+C in the terminal. Then check whether the variable in the condition ever changes.",
          hi: "Loop infinite chal raha ho toh terminal mein Ctrl+C dabao. Phir dekho ki condition wala variable kabhi badalta hai ya nahi."
        },
        deep: {
          en: [
            "Conditions are built from comparisons (`>`, `>=`, `==`, `!=`) joined with `and`, `or`, `not`. Python treats `0`, `\"\"`, `[]` and `None` as false; almost everything else is true. That shortcut is useful, but explicit checks are easier to read.",
            "`range(1, 6)` gives 1 to 5, not 6: the stop value is excluded. `range(0, 10, 2)` steps by two. `enumerate(names)` gives both the index and the value, which is cleaner than counting by hand.",
            "`break` leaves the loop immediately; `continue` skips to the next round. A `while True:` loop with a clear `break` is often easier to reason about than a complicated condition. If a loop never ends, print the condition's variables inside it."
          ],
          hi: [
            "Conditions comparisons (`>`, `>=`, `==`, `!=`) se bante hain, jinhe `and`, `or`, `not` jodte hain. Python `0`, `\"\"`, `[]` aur `None` ko false maanta hai; baaki lagbhag sab true. Shortcut useful hai, par saaf check padhna aasan hota hai.",
            "`range(1, 6)` 1 se 5 deta hai, 6 nahi: stop value include nahi hoti. `range(0, 10, 2)` do-do kadam leta hai. `enumerate(names)` index aur value dono deta hai, haath se count karne se saaf.",
            "`break` loop se turant bahar; `continue` agle round par. `while True:` ke saath ek saaf `break` aksar complicated condition se samajhna aasan hota hai. Loop kabhi na ruke toh andar condition ke variables print karo."
          ]
        },
        master: {
          en: ["Case: a loop should print 1 to 10 but never prints 7. Look for a `continue` before the print, and check whether the condition uses `<` instead of `<=`. Reproduce it in a three-line loop before touching the real script."],
          hi: ["Case: loop 1 se 10 print karna chahiye par 7 kabhi nahi aata. Print se pehle `continue` dhoondho, aur check karo ki condition mein `<` hai ya `<=`. Asli script chhune se pehle teen line ke loop mein reproduce karo."]
        },
        quiz: {
          q: { en: "Which loop fits 'keep asking until the user types quit'?", hi: "Kaunsa loop fit hai: 'jab tak user quit na likhe, poochte raho'?" },
          options: {
            en: ["for", "while", "if"],
            hi: ["for", "while", "if"]
          },
          answer: 1,
          why: {
            en: "You do not know how many times you will ask, so you loop while a condition is true.",
            hi: "Aapko pata nahi kitni baar poochna hai, isliye condition sach hone tak loop chalta hai."
          }
        }
      },
      {
        title: "Lists and functions",
        mins: 12,
        bullets: {
          en: [
            "A list holds many values in order: `marks = [72, 65, 90]`. Indexing starts at 0, so `marks[0]` is 72 and `marks[-1]` is the last one.",
            "List methods change it in place: `.append(x)` adds, `.sort()` orders. Functions return a new result without touching the original.",
            "A function packages steps under a name: `def average(xs): return sum(xs) / len(xs)`. Call it as `average(marks)`."
          ],
          hi: [
            "List kai values ko order mein rakhti hai: `marks = [72, 65, 90]`. Index 0 se shuru hota hai, toh `marks[0]` = 72 aur `marks[-1]` = last.",
            "List methods usko wahin badalte hain: `.append(x)` jodta hai, `.sort()` order karta hai. Functions naya result dete hain, original ko chhede bina.",
            "Function steps ko ek naam ke neeche pack karta hai: `def average(xs): return sum(xs) / len(xs)`. Call karo `average(marks)`."
          ]
        },
        note: {
          en: "Small functions with clear names are easier to test and reuse than one long script. Aim for one job per function.",
          hi: "Chhote aur saaf naam wale functions test karna aur reuse karna aasan hota hai, ek lambe script se. Ek function, ek kaam."
        },
        deep: {
          en: [
            "Slicing copies part of a list: `marks[1:3]` gives items 1 and 2, and `marks[::-1]` reverses it. `b = a` does not copy: both names point at the same list, so changing `b` changes `a`. Use `b = a[:]` or `list(a)` for a real copy.",
            "A function can take defaults: `def greet(name, polite=True)`. `return` sends a value back and ends the function; `print` only shows it. A function that returns nothing gives `None`, which is a common source of `NoneType` errors.",
            "Keep functions small and predictable: same input, same output, no surprise changes to outside data. Test one function with a tiny example before wiring it into the script. That is faster than debugging the whole program at once."
          ],
          hi: [
            "Slicing list ka hissa copy karti hai: `marks[1:3]` item 1 aur 2 deta hai, aur `marks[::-1]` ulta kar deta hai. `b = a` copy nahi karta: dono naam ek hi list par point karte hain, isliye `b` badalne se `a` badalta hai. Asli copy ke liye `b = a[:]` ya `list(a)`.",
            "Function defaults le sakta hai: `def greet(name, polite=True)`. `return` value wapas bhejta hai aur function khatam karta hai; `print` sirf dikhata hai. Kuch return na karne wala function `None` deta hai, jahan se `NoneType` errors aate hain.",
            "Functions chhote aur predictable rakho: same input, same output, bahar ke data mein surprise change nahi. Script mein jodne se pehle ek chhote example se function test karo. Poore program ko ek saath debug karne se yeh tez hai."
          ]
        },
        master: {
          en: ["Case: two functions share one list and one of them clears it for the other. Lists are mutable and passed by reference. Copy before changing (`items[:]`) or return a new list; do not edit a caller's data by surprise."],
          hi: ["Case: do functions ek hi list share karte hain aur ek dusre ke liye usko clear kar deta hai. Lists mutable hoti hain aur reference se jaati hain. Badalne se pehle copy karo (`items[:]`) ya nayi list return karo; caller ka data surprise mein mat badlo."]
        },
        quiz: {
          q: { en: "What is `[10, 20, 30][-1]`?", hi: "`[10, 20, 30][-1]` kya hai?" },
          options: {
            en: ["10", "20", "30"],
            hi: ["10", "20", "30"]
          },
          answer: 2,
          why: {
            en: "Negative indexes count from the end. -1 is the last item.",
            hi: "Negative index end se count karta hai. -1 matlab last item."
          }
        }
      },
      {
        title: "Your first useful script",
        mins: 14,
        bullets: {
          en: [
            "Start tiny: read input, clean it, decide, print. `name = input(\"Name? \").strip()` removes accidental spaces.",
            "Wrap the work in functions and a `main()` so you can test pieces separately and reuse them later.",
            "Save it as `tool.py` and run `python tool.py`. When it breaks, print the values just before the failing line — that is real debugging."
          ],
          hi: [
            "Chhote se shuru karo: input lo, saaf karo, decision lo, print karo. `name = input(\"Name? \").strip()` extra spaces hata deta hai.",
            "Kaam ko functions aur ek `main()` mein rakho, taaki har piece alag se test ho sake aur baad mein reuse ho.",
            "`tool.py` naam se save karo aur `python tool.py` se chalao. Jab error aaye, failing line se pehle values print karo — yehi asli debugging hai."
          ]
        },
        note: {
          en: "A script that saves its output to a file is already useful: a daily expense log, a name-list cleaner, or a quiz scorer.",
          hi: "Jo script apna output file mein save kare woh already useful hai: daily expense log, naam list cleaner, ya quiz scorer."
        },
        deep: {
          en: [
            "Validate input where it enters: strip spaces, check for empty text, and loop until the value makes sense. For numbers, `try: n = int(text) except ValueError:` lets you ask again instead of crashing.",
            "Files are opened with `with open(\"expenses.csv\", \"a\") as f:`. The `with` closes the file even if something fails. `\"a\"` appends, `\"w\"` overwrites, and `\"r\"` reads; choosing the wrong mode is how data disappears.",
            "When something breaks, read the traceback from the bottom up: the last line names the error, the line above shows where it happened. Print the values and types just before that line, then shrink the problem to the smallest script that still fails."
          ],
          hi: [
            "Input ko wahin validate karo jahan woh aata hai: spaces hatao, khaali text check karo, aur jab tak value theek na ho loop chalao. Numbers ke liye `try: n = int(text) except ValueError:` dobara poochne deta hai, crash nahi.",
            "Files `with open(\"expenses.csv\", \"a\") as f:` se kholte hain. `with` error hone par bhi file band karta hai. `\"a\"` append, `\"w\"` overwrite, `\"r\"` read; galat mode chunna hi data gayab hone ki wajah hai.",
            "Kuch toote toh traceback neeche se padho: last line error ka naam, uske upar wali line jagah batati hai. Us line se pehle values aur types print karo, phir problem ko sabse chhote script tak chhota karo jo ab bhi fail ho."
          ]
        },
        master: {
          en: ["Case: a script works perfectly once, then adds duplicate rows on every run. `open(..., 'a')` appends by design. Either check whether the record exists first, or switch to a write-once design with a timestamp you can filter."],
          hi: ["Case: script ek baar perfect chalta hai, phir har run par duplicate rows jodta hai. `open(..., 'a')` jaan-boojh kar append karta hai. Pehle check karo ki record hai ya nahi, ya timestamp ke saath write-once design apnao jise filter kar sako."]
        },
        quiz: {
          q: { en: "What does `.strip()` do to a string?", hi: "`.strip()` string ke saath kya karta hai?" },
          options: {
            en: ["Deletes the string", "Removes spaces at both ends", "Makes it uppercase"],
            hi: ["String delete kar deta hai", "Dono taraf ke spaces hata deta hai", "Uppercase kar deta hai"]
          },
          answer: 1,
          why: {
            en: "It trims leading and trailing whitespace, which is a common source of confusing bugs.",
            hi: "Yeh shuru aur end ke spaces hata deta hai, jahan se aksar confusing bugs aate hain."
          }
        }
      }
    ]
  },

  {
    id: "ai",
    title: "AI & ML",
    accent: "#ff5d8f",
    x: 76, y: 27,
    blurb: "What these models really do, and how to use them without being fooled.",
    fact: "The term artificial intelligence was coined for a 1956 summer workshop at Dartmouth College.",
    links: ["networking", "python", "quantum", "money"],
    lessons: [
      {
        title: "What AI is (and isn't)",
        mins: 10,
        bullets: {
          en: [
            "Today's AI is narrow: it is very good at one kind of pattern — text, images, or predictions — and does not generalise the way a person does.",
            "A model does not know facts the way you do. It learned statistical patterns from data and produces the most likely-looking answer.",
            "That is why it can sound confident and still be wrong. Confidence in the wording is not evidence."
          ],
          hi: [
            "Aaj ka AI narrow hai: woh ek type ke pattern mein bahut accha hai — text, image ya prediction — aur insaan ki tarah har cheez nahi samajhta.",
            "Model facts ko aapki tarah 'know' nahi karta. Usne data se statistical patterns seekhe hain aur sabse likely dikhne wala answer banata hai.",
            "Isliye woh confident lagte hue bhi galat ho sakta hai. Language ka confidence proof nahi hota."
          ]
        },
        note: {
          en: "A good test: ask the model something you already know well. You will spot its failure patterns faster.",
          hi: "Accha test: model se koi cheez poocho jo aap already acche se jaante ho. Uske failure patterns jaldi dikh jayenge."
        },
        deep: {
          en: [
            "Narrow AI is everywhere already: spam filters, photo search, recommendations, voice-to-text. Each is trained for one job. A chess engine that beats champions cannot recognise a cat, and that is not a bug: it was never trained for it.",
            "A language model predicts the next token from patterns in its training text. It has no live memory of facts and no way to check them unless a tool is connected. Its training has a cutoff, so recent events may be missing or wrong.",
            "Evaluate on data the model has never seen. Accuracy alone hides the difference between a harmless mistake and a costly one: a spam filter that blocks real invoices is worse than one that misses some spam. High-stakes answers need a human check."
          ],
          hi: [
            "Narrow AI pehle se har jagah hai: spam filter, photo search, recommendations, voice-to-text. Har ek ek kaam ke liye trained hai. Champion ko harane wala chess engine cat nahi pehchan sakta, aur yeh bug nahi: usko iske liye train hi nahi kiya gaya.",
            "Language model apne training text ke patterns se next token predict karta hai. Uske paas facts ki live memory nahi hoti aur tool na ho toh check ka rasta nahi. Training ka cutoff hota hai, isliye naye events missing ya galat ho sakte hain.",
            "Aise data par evaluate karo jo model ne kabhi dekha na ho. Sirf accuracy chhote aur mehnge mistake mein farq nahi batati: spam filter jo asli invoice block kare, usse behtar hai jo kuch spam chhod de. High-stakes answers par insaan ka check chahiye."
          ]
        },
        master: {
          en: ["Case: a model gives a confident date for a law that does not exist. Ask for the source, find none, and correct it from an official site. The fluency was prediction, not evidence. This is exactly where a two-minute check saves a real mistake."],
          hi: ["Case: model ek aise law ki confident date deta hai jo exist hi nahi karta. Source maango, na mile toh official site se correct karo. Fluent hona prediction tha, evidence nahi. Yahi jagah hai jahan do minute ka check asli galti bachata hai."]
        },
        quiz: {
          q: { en: "Why can an AI answer sound confident but be false?", hi: "AI ka answer confident hote hue galat kaise ho sakta hai?" },
          options: {
            en: ["It wants to trick you", "It predicts likely text, not verified facts", "It has no internet"],
            hi: ["Woh aapko trick karna chahta hai", "Woh likely text predict karta hai, verified facts nahi", "Uske paas internet nahi hai"]
          },
          answer: 1,
          why: {
            en: "Fluent text is the output of prediction. Fluency is not fact-checking.",
            hi: "Fluent text prediction ka output hai. Fluent hona fact-check hona nahi hai."
          }
        }
      },
      {
        title: "How a model learns",
        mins: 12,
        bullets: {
          en: [
            "Training means showing many examples, measuring the error, and nudging the model's numbers (weights) to reduce that error. Repeat millions of times.",
            "Training and using a model are different: training changes weights, inference just runs them. Your chat is inference.",
            "The data decides the ceiling. Biased or narrow data gives biased or narrow answers, no matter how big the model is."
          ],
          hi: [
            "Training ka matlab: bahut examples dikhao, error naapo, aur model ke numbers (weights) thoda adjust karo taaki error kam ho. Yeh lakhon baar repeat hota hai.",
            "Training aur use karna alag hai: training weights badalta hai, inference sirf unko chalata hai. Aapka chat inference hai.",
            "Data hi limit decide karta hai. Biased ya kam data se biased ya kamzor answers milenge, model kitna bada bhi ho."
          ]
        },
        note: {
          en: "'Garbage in, garbage out' is the whole story. Most AI failures in real products are data and evaluation failures, not model failures.",
          hi: "'Garbage in, garbage out' hi poori kahani hai. Real products mein zyadatar AI failure data aur evaluation ke hote hain, model ke nahi."
        },
        deep: {
          en: [
            "Training starts with random weights, measures the loss (how wrong the output is), and uses gradient descent to move each weight a little in the direction that lowers the loss. The learning rate controls the step size: too big and it bounces, too small and it crawls.",
            "Overfitting is memorising the practice set instead of learning the pattern: training accuracy keeps rising while validation accuracy falls. More data, simpler models, early stopping and regularisation are the usual fixes. A validation set is how you see it at all.",
            "The labels and the feedback define what the model optimises, not what you intended. A hiring model trained on past hires learns past bias; a chatbot rewarded for agreement learns to please. Check the data and the objective, not just the output."
          ],
          hi: [
            "Training random weights se shuru hoti hai, loss naapti hai (output kitna galat hai), aur gradient descent se har weight ko thoda us direction mein hilati hai jahan loss kam ho. Learning rate step ka size control karta hai: bahut bada toh bounce, bahut chhota toh crawl.",
            "Overfitting matlab pattern ki jagah practice set ratna: training accuracy badhti rehti hai jabki validation accuracy girti hai. Zyada data, simple model, early stopping aur regularisation iske usual fix hain. Validation set hi isko dikhata hai.",
            "Labels aur feedback decide karte hain model kya optimise karega, woh nahi jo aap chahte the. Purane hires par trained hiring model purana bias seekhta hai; agreement par reward paane wala chatbot khush karne ki aadat seekhta hai. Sirf output nahi, data aur objective check karo."
          ]
        },
        master: {
          en: ["Case: a support classifier is 95% accurate but misses every urgent complaint. The classes are imbalanced, so accuracy hides the failure. Measure recall on the urgent class, add real examples, and only then trust the number."],
          hi: ["Case: support classifier 95% accurate hai par har urgent complaint miss karta hai. Classes imbalanced hain, isliye accuracy failure chhupa deti hai. Urgent class par recall naapo, asli examples jodo, phir number par bharosa karo."]
        },
        quiz: {
          q: { en: "What changes during training?", hi: "Training ke dauraan kya badalta hai?" },
          options: {
            en: ["The user's prompts", "The model's weights", "The internet"],
            hi: ["User ke prompts", "Model ke weights", "Internet"]
          },
          answer: 1,
          why: {
            en: "Weights are the adjustable numbers. Training searches for better ones.",
            hi: "Weights hi adjustable numbers hain. Training behtar numbers dhoondti hai."
          }
        }
      },
      {
        title: "Neural networks in one picture",
        mins: 12,
        bullets: {
          en: [
            "A neural network is layers of simple numbers. Each layer takes the previous layer's output, multiplies by weights, adds a bias, and passes it on.",
            "Non-linear steps between layers let the network bend, not just draw straight lines. Without them, many layers would collapse into one.",
            "Backpropagation is just the chain rule: it works out how much each weight contributed to the error, then moves it in the useful direction."
          ],
          hi: [
            "Neural network simple numbers ki layers hai. Har layer pichli layer ka output leti hai, weights se multiply karti hai, bias jodti hai, aur aage bhejti hai.",
            "Layers ke beech non-linear step network ko modne deta hai, sirf seedhi line nahi. Iske bina kai layers ek hi layer ban jaati.",
            "Backpropagation chain rule hi hai: woh nikalta hai ki error mein kis weight ka kitna hissa hai, phir usko useful direction mein hilata hai."
          ]
        },
        note: {
          en: "You rarely build these by hand today. Understanding the idea helps you read why a model fails, overfits, or needs more data.",
          hi: "Aaj inhe haath se kam banate hain. Idea samajhna help karta hai yeh padhne mein ki model fail kyun hota hai, overfit kyun hota hai, ya data kab chahiye."
        },
        deep: {
          en: [
            "One neuron is a weighted sum plus a bias, passed through an activation such as ReLU. A layer stacks many neurons, so a 100-input, 64-neuron layer has 6,400 weights plus 64 biases. Training changes those numbers, nothing else.",
            "The forward pass turns input into a prediction; the loss compares it with the answer; backpropagation sends the blame backwards through the same weights. One update changes every weight a little. Repeat with small batches, millions of times.",
            "Attention, the idea behind modern language models, lets each token look at other tokens and decide what matters. That is why context changes meaning: the word 'bank' is interpreted from the sentence around it, not stored as one fixed definition."
          ],
          hi: [
            "Ek neuron weighted sum plus bias hai, jise ReLU jaisi activation se guzarte hain. Ek layer kai neurons ko stack karti hai, toh 100 input aur 64 neurons wali layer mein 6,400 weights aur 64 biases hote hain. Training sirf yeh numbers badalti hai.",
            "Forward pass input ko prediction banata hai; loss answer se compare karta hai; backpropagation wahi weights use karke galti ka blame peeche bhejta hai. Ek update har weight thoda badalta hai. Chhote batches ke saath lakhon baar repeat.",
            "Attention, jo modern language models ka idea hai, har token ko dusre tokens dekhne aur decide karne deta hai ki kya matter karta hai. Isliye context meaning badalta hai: 'bank' ko aas-paas ke sentence se samjha jaata hai, ek fixed definition se nahi."
          ]
        },
        master: {
          en: ["Case: a model shines in the demo and fails on real users. The demo data matched the training data too closely. Build a validation set from real traffic, test before shipping, and watch the failures instead of the average."],
          hi: ["Case: model demo mein chamakta hai par real users par fail hota hai. Demo data training data se bahut milta tha. Real traffic se validation set banao, ship karne se pehle test karo, aur average ki jagah failures dekho."]
        },
        quiz: {
          q: { en: "Why do networks need non-linear steps?", hi: "Networks ko non-linear steps kyun chahiye?" },
          options: {
            en: ["To run faster", "To learn curves, not just straight lines", "To use less data"],
            hi: ["Tez chalne ke liye", "Curves seekhne ke liye, sirf seedhi lines nahi", "Kam data use karne ke liye"]
          },
          answer: 1,
          why: {
            en: "Without non-linearity, stacking layers adds no expressive power.",
            hi: "Non-linearity ke bina layers jodne se koi extra power nahi aati."
          }
        }
      },
      {
        title: "Using AI without getting fooled",
        mins: 12,
        bullets: {
          en: [
            "Give context: what you want, for whom, in what format, and what to avoid. Vague prompts get vague answers.",
            "Ask for the reasoning and the sources, then check the checkable parts. Numbers, names and quotes are where hallucinations hide.",
            "Use AI for drafts, summaries and explanations — not as the final authority on medicine, law, money or safety."
          ],
          hi: [
            "Context do: kya chahiye, kiske liye, kis format mein, aur kya avoid karna hai. Vague prompt se vague answer milega.",
            "Reasoning aur sources maango, phir jo check ho sakta hai woh check karo. Numbers, naam aur quotes mein hi hallucination chhupti hai.",
            "AI ko draft, summary aur explanation ke liye use karo — medicine, law, paise ya safety ka final authority mat banao."
          ]
        },
        note: {
          en: "A useful habit: ask 'what would make this answer wrong?' Models often produce the counter-check themselves.",
          hi: "Useful habit: poocho 'yeh answer kis wajah se galat ho sakta hai?' Models aksar counter-check khud bana dete hain."
        },
        deep: {
          en: [
            "A strong prompt has five parts: the job, the audience, the context, the output format, and the constraints. Add one worked example if the format matters. Then ask it to list its assumptions; wrong assumptions are easier to spot than wrong prose.",
            "Hallucinations cluster in specifics: dates, numbers, names, quotes, citations and API details. Ask for sources, then open them. If a source cannot be found in two minutes, treat the claim as unverified, not as true.",
            "Do not paste passwords, private client data or health records into a chat you do not control. Assume anything you send may be stored or reviewed. Use AI for drafts and explanations, keep the judgement, and say when a human checked the final answer."
          ],
          hi: [
            "Accha prompt paanch hisson se banta hai: kaam, audience, context, output format aur constraints. Format matter kare toh ek worked example do. Phir usse assumptions list karne ko kaho; galat assumption galat prose se aasani se dikhta hai.",
            "Hallucinations specifics mein aati hain: dates, numbers, naam, quotes, citations aur API details. Sources maango, phir kholo. Do minute mein source na mile toh claim ko unverified maano, sach nahi.",
            "Passwords, private client data ya health records aise chat mein mat daalo jo aapke control mein nahi. Maan lo jo bheja woh store ya review ho sakta hai. AI ko draft aur explanation ke liye use karo, judgement apne paas rakho, aur batao jab insaan ne final answer check kiya."
          ]
        },
        master: {
          en: ["Case: a chatbot is asked for a medical dosage. The right answer is a boundary plus a professional, not an improvised number. Say what it cannot do, give the safe next step, and keep a human in the loop for anything with real consequences."],
          hi: ["Case: chatbot se medical dosage poocha jaata hai. Sahi jawab boundary plus professional hai, apne se banaya number nahi. Batao yeh kya nahi kar sakta, safe next step do, aur asli consequences wali cheezon mein insaan ko loop mein rakho."]
        },
        quiz: {
          q: { en: "Where should you be most careful with AI output?", hi: "AI output par sabse zyada dhyaan kahan dena chahiye?" },
          options: {
            en: ["Casual chat", "Specific numbers and citations", "Brainstorming"],
            hi: ["Casual chat", "Specific numbers aur citations", "Brainstorming"]
          },
          answer: 1,
          why: {
            en: "Precise-sounding details are the easiest to fabricate and the most damaging when wrong.",
            hi: "Precise lagne wali details sabse aasan fabricate hoti hain aur galat hone par sabse zyada nuksan karti hain."
          }
        }
      }
    ]
  },

  {
    id: "quantum",
    title: "Quantum Physics",
    accent: "#ffb26b",
    x: 80, y: 62,
    blurb: "The rules at the smallest scale, explained without the magic.",
    fact: "A qubit can hold 0 and 1 at the same time — until you measure it.",
    links: ["ai", "python"],
    lessons: [
      {
        title: "Why quantum physics exists",
        mins: 12,
        bullets: {
          en: [
            "Classical physics worked for planets and cars but failed for atoms. Experiments kept showing energy arriving in fixed chunks, not smoothly.",
            "Planck called these chunks quanta. One quantum is the smallest amount of energy a system can exchange at a given frequency.",
            "Quantum physics is not 'spooky magic'; it is the set of rules that matches what we actually measure at very small scales."
          ],
          hi: [
            "Classical physics planets aur gaadiyon par kaam karti thi, par atoms par fail ho gayi. Experiments baar baar dikha rahe the ki energy smooth nahi, fixed chunks mein aati hai.",
            "Planck ne in chunks ko quanta kaha. Ek quantum us frequency par system ke energy exchange ka sabse chhota amount hai.",
            "Quantum physics 'jadu' nahi hai; yeh woh rules hain jo bahut chhote scale par hum jo measure karte hain usse match karte hain."
          ]
        },
        note: {
          en: "The word 'quantum' just means 'a fixed amount'. Quantum leap means a jump between allowed levels, not a huge jump.",
          hi: "'Quantum' ka matlab bas 'fixed amount' hai. Quantum leap ka matlab allowed levels ke beech jump, bada jump nahi."
        },
        deep: {
          en: [
            "The crack appeared in black-body radiation: classical physics predicted infinite energy at short wavelengths, which was obviously wrong. Planck found that assuming energy comes in packets of E = hf matched the measurements. Einstein used the same idea for the photoelectric effect.",
            "In an atom, electrons can only occupy certain energy levels. They emit or absorb light at the gaps between levels, which is why each element has a unique spectrum. That fingerprint is how astronomers identify what stars are made of.",
            "Planck's constant is tiny, about 6.6 x 10^-34 joule-seconds, which is why a cricket ball never looks quantum. The rules are always there; at large scales the steps are so small that motion looks continuous."
          ],
          hi: [
            "Daraar black-body radiation mein dikhi: classical physics short wavelength par infinite energy predict karti thi, jo saaf galat tha. Planck ne energy ko E = hf ke packets mein maana aur measurements match ho gaye. Einstein ne wahi idea photoelectric effect ke liye use kiya.",
            "Atom mein electrons sirf kuch fixed energy levels par reh sakte hain. Woh levels ke gaps ke hisaab se light chhodte ya lete hain, isliye har element ka spectrum alag hota hai. Isi fingerprint se astronomers stars mein kya hai pehchante hain.",
            "Planck constant bahut chhota hai, lagbhag 6.6 x 10^-34 joule-second, isliye cricket ball quantum nahi lagti. Rules hamesha lagte hain; bade scale par steps itne chhote hote hain ki motion smooth dikhti hai."
          ]
        },
        master: {
          en: ["Case: a student says 'quantum means everything is uncertain'. Correct it: the wavefunction is precise; it predicts probabilities, and those statistics are tested to many decimal places. The uncertainty is in individual outcomes, not in the theory."],
          hi: ["Case: student kehta hai 'quantum matlab sab kuch uncertain'. Correct karo: wavefunction precise hai; woh probabilities predict karta hai, aur woh statistics kai decimal tak test hote hain. Uncertainty individual outcomes mein hai, theory mein nahi."]
        },
        quiz: {
          q: { en: "What does 'quantum' mean here?", hi: "Yahan 'quantum' ka matlab kya hai?" },
          options: {
            en: ["Magic", "A fixed smallest amount", "A particle"],
            hi: ["Jadu", "Ek fixed sabse chhota amount", "Ek particle"]
          },
          answer: 1,
          why: {
            en: "It refers to a discrete amount of energy, not a mysterious force.",
            hi: "Yeh energy ke ek discrete amount ko kehte hain, koi rahasyamayi force nahi."
          }
        }
      },
      {
        title: "Wave and particle",
        mins: 12,
        bullets: {
          en: [
            "Fire electrons one at a time through two slits and they build an interference pattern — as if each electron passed through both slits as a wave.",
            "Detect which slit it went through and the pattern disappears. The way you measure changes what you can see.",
            "Light shows the same dual behaviour. Wave and particle are two descriptions we need; neither alone explains every experiment."
          ],
          hi: [
            "Electrons ko ek-ek karke do slits se bhejo, toh interference pattern banta hai — jaise har electron wave ban kar dono slits se gaya ho.",
            "Aap measure karo ki woh kis slit se gaya, toh pattern gayab ho jaata hai. Measurement ka tareeqa hi badal deta hai ki aap kya dekh sakte ho.",
            "Light bhi same dual behaviour dikhati hai. Wave aur particle do descriptions hain; koi ek akela har experiment explain nahi karti."
          ]
        },
        note: {
          en: "This is not about cameras being sneaky. Any interaction that carries away 'which path' information destroys the interference.",
          hi: "Yeh camera ki chori nahi hai. Jo bhi interaction 'kaunsa rasta' ki information le jaata hai, woh interference mita deta hai."
        },
        deep: {
          en: [
            "The double-slit result is built up one electron at a time: each electron lands as a single dot, but after thousands of dots the interference pattern appears. The pattern is a probability map, not a message travelling through both slits.",
            "Every object has a wavelength, lambda = h/p. A moving cricket ball has a wavelength far smaller than an atom, so its wave nature is invisible. An electron has a wavelength about the size of a molecule, which is why it can interfere.",
            "Which-path information is the key, not a conscious observer. Any interaction that leaves a record of the path (a photon bouncing off, a detector clicking) destroys the interference. Nothing about a human 'looking' is required."
          ],
          hi: [
            "Double-slit result ek-ek electron se banta hai: har electron ek dot ki tarah girta hai, par hazaron dots ke baad interference pattern dikhta hai. Pattern probability ka map hai, dono slits se jaane wala message nahi.",
            "Har cheez ki wavelength hoti hai, lambda = h/p. Chalte cricket ball ki wavelength atom se bhi bahut chhoti hai, isliye uski wave nature dikhti nahi. Electron ki wavelength molecule ke size ki hoti hai, isliye woh interfere kar sakta hai.",
            "Asli cheez which-path information hai, conscious observer nahi. Jo bhi interaction path ka record chhod de (photon takra kar wapas aaye, detector click kare) interference khatam. Insaan ka 'dekhna' zaroori nahi."
          ]
        },
        master: {
          en: ["Case: an article claims a phone charges itself using entanglement. Entanglement cannot transmit energy or messages; it only correlates measurements. Check what actually transfers energy: a cable, a coil, or light. The claim is false before the maths starts."],
          hi: ["Case: ek article kehta hai phone entanglement se khud charge hota hai. Entanglement energy ya message transmit nahi karta; sirf measurements correlate karta hai. Dekho energy asal mein kya bhej raha hai: cable, coil ya light. Maths se pehle claim galat hai."]
        },
        quiz: {
          q: { en: "What happens to the pattern when you detect which slit the electron used?", hi: "Jab aap detect karte ho ki electron kis slit se gaya, pattern ka kya hota hai?" },
          options: {
            en: ["It gets brighter", "It disappears", "It doubles"],
            hi: ["Chamakdar ho jaata hai", "Gayab ho jaata hai", "Double ho jaata hai"]
          },
          answer: 1,
          why: {
            en: "Knowing the path means the paths no longer interfere.",
            hi: "Rasta pata hone ka matlab hai ki raste ab interfere nahi karte."
          }
        }
      },
      {
        title: "Superposition and measurement",
        mins: 12,
        bullets: {
          en: [
            "Before measurement, a quantum system is described by a wavefunction that gives probabilities for possible outcomes — not one hidden definite value.",
            "Measurement gives one result and updates the description. 'Collapse' is our name for that update, not a physical explosion.",
            "Schrödinger's cat was a thought experiment to show how strange this sounds at human scale — not a claim that cats are both dead and alive in real labs."
          ],
          hi: [
            "Measurement se pehle quantum system ek wavefunction se describe hota hai jo possible outcomes ki probabilities deta hai — ek chhupa hua pakka value nahi.",
            "Measurement ek result deta hai aur description update kar deta hai. 'Collapse' us update ka naam hai, koi physical dhamaka nahi.",
            "Schrödinger ki billi ek thought experiment tha, yeh dikhane ke liye ki insaan ke scale par yeh kitna ajeeb lagta hai — yeh claim nahi ki asli lab mein billi dead aur alive dono hoti hai."
          ]
        },
        note: {
          en: "Probabilities are not ignorance. Experiments rule out simple 'it was already decided, we just didn't know' explanations.",
          hi: "Probabilities ignorance nahi hain. Experiments simple 'pehle se decide tha, bas humein pata nahi tha' wali explanation ko rule out karte hain."
        },
        deep: {
          en: [
            "A quantum state is written with amplitudes, and the probability of a result is the amplitude squared. Amplitudes can be negative and cancel each other; probabilities cannot. That is why interference is possible before measurement and not after.",
            "Spin is not a tiny spinning ball. A Stern-Gerlach magnet splits a beam into two spots because the spin is genuinely in a combination of up and down until measured. Measuring the same state in a different direction gives different probabilities.",
            "Decoherence explains why everyday objects do not stay in superpositions: any contact with the environment leaks the 'which state' information, and the interference disappears in a fraction of a second. Quantum computers fight this with cold temperatures and isolation."
          ],
          hi: [
            "Quantum state amplitudes se likha jaata hai, aur kisi result ki probability amplitude ka square hoti hai. Amplitudes negative ho sakti hain aur ek dusre ko cancel kar sakti hain; probabilities nahi. Isliye measurement se pehle interference hota hai, baad mein nahi.",
            "Spin koi chhota ghoomta ball nahi hai. Stern-Gerlach magnet beam ko do spots mein todta hai kyunki measurement tak spin sach mein up aur down ke combination mein hota hai. Same state ko alag direction se measure karne par probabilities badal jaati hain.",
            "Decoherence batata hai roz ki cheezein superposition mein kyun nahi rehtin: environment se koi bhi contact 'kaunsi state' ki information leak kar deta hai, aur interference ek second ke hisse mein gayab ho jaata hai. Quantum computers isse thand aur isolation se ladte hain."
          ]
        },
        master: {
          en: ["Case: someone says a quantum computer 'tries every answer at once'. It manipulates amplitudes so wrong paths cancel; only some problems get a speedup. Errors and decoherence are still the bottleneck, which is why useful machines are so hard."],
          hi: ["Case: koi kehta hai quantum computer 'ek saath har answer try karta hai'. Woh amplitudes aise badalta hai ki galat raste cancel ho jaayein; sirf kuch problems mein speedup milta hai. Errors aur decoherence ab bhi bottleneck hain, isliye useful machine banana mushkil hai."]
        },
        quiz: {
          q: { en: "What does the wavefunction give you?", hi: "Wavefunction aapko kya deta hai?" },
          options: {
            en: ["The exact result", "Probabilities of outcomes", "The particle's colour"],
            hi: ["Exact result", "Outcomes ki probabilities", "Particle ka colour"]
          },
          answer: 1,
          why: {
            en: "It predicts the statistics of many measurements, not a single guaranteed outcome.",
            hi: "Yeh kai measurements ki statistics batata hai, ek guaranteed outcome nahi."
          }
        }
      },
      {
        title: "Entanglement and real uses",
        mins: 12,
        bullets: {
          en: [
            "Two entangled particles share a joint state. Measure one and the other's result is correlated, however far apart they are.",
            "That does not allow faster-than-light messages: you cannot choose the result you get, so you cannot send information this way.",
            "Real uses are narrower and real: quantum key distribution for secure keys, and quantum computers that may speed up specific problems like simulation and factoring."
          ],
          hi: [
            "Do entangled particles ek joint state share karte hain. Ek ko measure karo, dusre ka result correlated milega — chahe woh kitne door hon.",
            "Isse light se tez message nahi bhej sakte: aap result choose nahi kar sakte, isliye is tarah information nahi jaati.",
            "Asli uses chhote par real hain: secure keys ke liye quantum key distribution, aur quantum computers jo kuch specific problems — simulation aur factoring — tez kar sakte hain."
          ]
        },
        note: {
          en: "Quantum computers are not faster at everything. For most everyday tasks, a normal computer is still the right tool.",
          hi: "Quantum computers har cheez mein tez nahi hain. Zyadatar roz ke kaamon ke liye normal computer hi sahi tool hai."
        },
        deep: {
          en: [
            "Entangled particles do not have separate states; they have one joint state. The results are correlated in every direction, more strongly than any local hidden-variable theory allows, which is what Bell tests showed and the 2022 Nobel Prize recognised.",
            "You cannot use entanglement to send a message because each side's own results look random. Only after comparing notes over a normal channel does the correlation appear. 'Spooky action' is correlation, not a signal.",
            "Quantum key distribution uses that idea to detect eavesdropping: an attacker measuring the qubits changes them, and the two sides see errors. It is real but limited by distance and hardware; quantum computers are also real but only faster for specific problems."
          ],
          hi: [
            "Entangled particles ke alag-alag states nahi hote; ek joint state hota hai. Results har direction mein correlated hote hain, kisi local hidden-variable theory se zyada strong, jo Bell tests ne dikhaya aur 2022 ka Nobel isi ko mila.",
            "Entanglement se message nahi bhej sakte kyunki dono taraf ke apne results random dikhte hain. Normal channel par notes compare karne ke baad hi correlation dikhti hai. 'Spooky action' correlation hai, signal nahi.",
            "Quantum key distribution isi idea se eavesdropping pakadti hai: attacker qubits measure kare toh woh badal jaate hain aur dono taraf errors dikhte hain. Yeh real hai par distance aur hardware se limited; quantum computers bhi real hain par sirf kuch specific problems mein tez."
          ]
        },
        master: {
          en: ["Case: an experiment sees interference vanish when a detector is switched on. The detector entangled with the particle and recorded which path it took; no conscious observer is involved. Remove the path information and the pattern returns."],
          hi: ["Case: detector on karte hi interference gayab ho jaata hai. Detector particle ke saath entangled ho gaya aur path record kar liya; koi conscious observer involved nahi. Path information hatao toh pattern wapas aa jaata hai."]
        },
        quiz: {
          q: { en: "Can entanglement send a message faster than light?", hi: "Kya entanglement light se tez message bhej sakta hai?" },
          options: {
            en: ["Yes, instantly", "No, you cannot choose the outcome", "Only in space"],
            hi: ["Haan, turant", "Nahi, aap outcome choose nahi kar sakte", "Sirf space mein"]
          },
          answer: 1,
          why: {
            en: "Correlation is not control. Without choosing the result, no signal is sent.",
            hi: "Correlation control nahi hai. Result choose na kar paane se koi signal nahi jaata."
          }
        }
      }
    ]
  },

  {
    id: "money",
    title: "Personal Finance",
    accent: "#6ee787",
    x: 50, y: 78,
    blurb: "Boring money habits that quietly beat clever ones.",
    fact: "A 1% yearly fee can quietly eat a large slice of 30 years of growth.",
    links: ["ai", "speaking"],
    lessons: [
      {
        title: "Know your numbers",
        mins: 12,
        bullets: {
          en: [
            "Track money for one month before changing anything. You cannot fix a number you have not measured.",
            "Split spending into needs (rent, food, transport) and wants (subscriptions, eating out). Both are allowed; the problem is when wants quietly eat the needs.",
            "Pay yourself first: move savings out on the day money arrives, not whatever is left at the end. What is left is usually nothing."
          ],
          hi: [
            "Kuch badalne se pehle ek mahine paise track karo. Jo number aapne naapa nahi, usko sudhaar nahi sakte.",
            "Kharch ko needs (kiraya, khana, travel) aur wants (subscriptions, bahar khana) mein baanto. Dono theek hain; problem tab hai jab wants chupke se needs kha jaate hain.",
            "Pehle khud ko pay karo: paisa aane ke din savings alag karo, end mein bacha hua nahi. End mein aksar kuch bachta hi nahi."
          ]
        },
        note: {
          en: "A budget is not a punishment. It is a decision made in advance instead of at the moment you are tired and hungry.",
          hi: "Budget punishment nahi hai. Yeh pehle se liya gaya decision hai, us waqt lene ke bajaye jab aap thake aur bhookhe ho."
        },
        deep: {
          en: [
            "Separate fixed costs (rent, insurance, loan payments) from variable ones (food, travel, fun). Fixed costs set your floor; variable costs are where a month can quietly go wrong. List annual costs too, then divide by 12 so they stop surprising you.",
            "50/30/20 (needs, wants, savings) is a starting point, not a rule. In an expensive city the needs slice may be 60%. What matters is that savings happens first and the numbers are honest, not that the percentages look perfect.",
            "Inflation is why a number in your account is not the same as buying power. At 6% inflation, prices double in roughly 12 years (72 divided by 6). A savings rate below inflation grows the number and shrinks what it can buy."
          ],
          hi: [
            "Fixed costs (kiraya, insurance, loan) ko variable (khana, travel, fun) se alag karo. Fixed costs aapka floor set karte hain; variable mein hi mahina chupke se bigadta hai. Annual costs bhi likho, phir 12 se divide karo taaki woh surprise na karein.",
            "50/30/20 (needs, wants, savings) shuruaat hai, niyam nahi. Mehnge sheher mein needs 60% ho sakta hai. Matter yeh hai ki savings pehle hoti hai aur numbers imandaar hain, percentages perfect dikhna nahi.",
            "Inflation ki wajah se account ka number aur buying power alag hoti hai. 6% inflation par prices lagbhag 12 saal mein double hote hain (72 divided by 6). Inflation se kam savings number badhata hai par usse kharida jaane wala kam."
          ]
        },
        master: {
          en: ["Case: a raise arrives and savings do not move. Lifestyle expanded to absorb it. Automate the transfer on payday, before the new spending settles, and raise the amount once, not every month by willpower."],
          hi: ["Case: raise aaya par savings nahi badhi. Lifestyle ne usko kha liya. Payday par transfer automate karo, naya kharch settle hone se pehle, aur amount ek baar badhao, har mahine willpower se nahi."]
        },
        quiz: {
          q: { en: "What is 'pay yourself first'?", hi: "'Pay yourself first' kya hai?" },
          options: {
            en: ["Spend on yourself first", "Move savings out as soon as income arrives", "Pay bills last"],
            hi: ["Pehle khud par kharch karo", "Income aate hi savings alag karo", "Bills last mein bharo"]
          },
          answer: 1,
          why: {
            en: "Savings that happen automatically survive the month; leftovers rarely do.",
            hi: "Automatic savings mahine bhar survive karti hai; bacha hua paisa aksar nahi bachta."
          }
        }
      },
      {
        title: "The emergency fund",
        mins: 12,
        bullets: {
          en: [
            "Keep 3–6 months of essential expenses in cash or a savings account you can reach in a day. This is insurance, not investment.",
            "It exists so a job loss or medical bill does not become a high-interest loan. That is why it stays liquid and boring.",
            "Build it before investing. Selling investments in a panic to cover rent is how small problems become big ones."
          ],
          hi: [
            "3–6 mahine ke essential kharch cash ya savings account mein rakho jahan se ek din mein nikal sake. Yeh insurance hai, investment nahi.",
            "Yeh isliye hai ki naukri jaane ya medical bill par high-interest loan na lena pade. Isliye woh liquid aur boring rehta hai.",
            "Invest karne se pehle isko banao. Ghabrahat mein investment bech kar kiraya dena hi chhote problem ko bada banata hai."
          ]
        },
        note: {
          en: "Emergency money is for emergencies, not for a sale or a trip. If you use it, refill it before investing again.",
          hi: "Emergency paisa emergency ke liye hai, sale ya trip ke liye nahi. Agar use kiya, dobara invest karne se pehle bharo."
        },
        deep: {
          en: [
            "Calculate essential monthly expenses, not income: rent, food, transport, utilities, insurance and minimum debt payments. If your income is unstable or you support a family, target 6 to 12 months; a stable two-income home can start at 3.",
            "Keep it where you can reach it in a day but not with a debit card at a restaurant: a separate high-yield savings account works. Returns are not the job; not needing a 36% credit card is the return.",
            "Using the fund is allowed; that is what it is for. The rule is to refill it before adding new investments. Insurance (health, disability, term life where relevant) covers the huge events a small fund cannot."
          ],
          hi: [
            "Essential monthly kharch gino, income nahi: kiraya, khana, transport, utilities, insurance aur minimum debt payments. Income unstable ho ya family support karte ho toh 6 se 12 mahine target karo; stable do-income ghar 3 se shuru kar sakta hai.",
            "Paisa wahan rakho jahan ek din mein pahunche par restaurant mein debit card se na khinche: alag high-yield savings account theek hai. Return iska kaam nahi; 36% credit card ki zarurat na padna hi return hai.",
            "Fund use karna allowed hai; usi ke liye hai. Rule hai ki naye investments se pehle usko dobara bharo. Insurance (health, disability, term life jahan zaroori ho) bade events cover karta hai jo chhota fund nahi kar sakta."
          ]
        },
        master: {
          en: ["Case: a 0% credit card offer arrives and you are tempted to invest the limit. Check the fee, the rate after the promo, and the minimum payment. A 0% card used to fund wants is still debt, and the promo always ends."],
          hi: ["Case: 0% credit card offer aata hai aur limit invest karne ka mann karta hai. Fee, promo ke baad ka rate, aur minimum payment check karo. Wants fund karne wala 0% card bhi debt hai, aur promo hamesha khatam hota hai."]
        },
        quiz: {
          q: { en: "Why should an emergency fund be easy to access?", hi: "Emergency fund aasani se accessible kyun hona chahiye?" },
          options: {
            en: ["To earn high returns", "So a crisis does not become debt", "To invest it quickly"],
            hi: ["High returns ke liye", "Taaki crisis debt na bane", "Jaldi invest karne ke liye"]
          },
          answer: 1,
          why: {
            en: "Its job is preventing expensive borrowing, not growth.",
            hi: "Iska kaam mehnga borrowing rokna hai, growth nahi."
          }
        }
      },
      {
        title: "Compound interest, both directions",
        mins: 12,
        bullets: {
          en: [
            "Compound interest means you earn on your interest. Money grows faster the longer it stays, so time matters more than a small difference in rate.",
            "The same maths works against you with debt. A 36% credit card balance can double in about two years.",
            "Rule of 72: divide 72 by the yearly rate to get the rough years to double. At 8%, about 9 years."
          ],
          hi: [
            "Compound interest ka matlab aapke interest par bhi interest milta hai. Paisa jitna lamba rukta hai utna tez badhta hai, isliye rate ke chhote farq se zyada time matters karta hai.",
            "Same maths debt mein aapke khilaaf chalta hai. 36% wala credit card balance lagbhag do saal mein double ho sakta hai.",
            "Rule of 72: 72 ko yearly rate se divide karo, mil jayenge lagbhag double hone ke saal. 8% par lagbhag 9 saal."
          ]
        },
        note: {
          en: "Starting ten years earlier usually beats finding a slightly better rate. Consistency is the lever you actually control.",
          hi: "Das saal pehle shuru karna aksar thoda behtar rate dhoondhne se jeet jaata hai. Consistency hi lever hai jo aapke control mein hai."
        },
        deep: {
          en: [
            "The formula is A = P(1 + r/n)^(nt): P is the starting amount, r the yearly rate, n how often it compounds, t the years. More frequent compounding helps a little; the years and the rate matter far more.",
            "On debt the same maths runs backwards. A 36% card is about 3% a month, so a balance can double in roughly two years if you only pay the minimum. Avalanche (highest rate first) saves the most interest; snowball (smallest balance first) is easier to keep doing.",
            "Fees compound too. A 1% yearly fee on a long investment can take a large slice of the final amount, and tax does the same. Compare real return, after inflation, fees and tax, not the headline number."
          ],
          hi: [
            "Formula hai A = P(1 + r/n)^(nt): P shuruaati paisa, r saalana rate, n kitni baar compound hota hai, t saal. Zyada frequent compounding thoda fayda deta hai; saal aur rate usse bahut zyada matter karte hain.",
            "Debt par wahi maths ulta chalta hai. 36% card lagbhag 3% mahina hai, toh sirf minimum dene par balance lagbhag do saal mein double ho sakta hai. Avalanche (sabse high rate pehle) sabse zyada interest bachata hai; snowball (sabse chhota balance pehle) chalana aasan hota hai.",
            "Fees bhi compound hoti hain. Lambe investment par 1% saalana fee final amount ka bada hissa le sakti hai, aur tax bhi wahi karta hai. Headline number nahi, real return dekho: inflation, fees aur tax ke baad."
          ]
        },
        master: {
          en: ["Case: an adviser promises 18% guaranteed. Nobody can guarantee market returns. Check the register, the fee sheet and how withdrawals work. Urgency plus a guarantee is a sales pattern, not an investment strategy."],
          hi: ["Case: adviser 18% guaranteed promise karta hai. Koi market return guarantee nahi kar sakta. Register, fee sheet aur withdrawal rules check karo. Urgency plus guarantee sales pattern hai, investment strategy nahi."]
        },
        quiz: {
          q: { en: "At 8% a year, roughly how long does money take to double?", hi: "8% saalana par paisa lagbhag kitne saal mein double hota hai?" },
          options: {
            en: ["About 9 years", "About 2 years", "About 30 years"],
            hi: ["Lagbhag 9 saal", "Lagbhag 2 saal", "Lagbhag 30 saal"]
          },
          answer: 0,
          why: {
            en: "72 divided by 8 is 9. It is a rough estimate, not a promise.",
            hi: "72 ko 8 se divide karo, 9 aata hai. Yeh mota estimate hai, promise nahi."
          }
        }
      },
      {
        title: "Investing without gambling",
        mins: 12,
        bullets: {
          en: [
            "An index fund buys many companies at once, so one company failing does not sink you. That is diversification, and it is the main free lunch.",
            "Higher expected return comes with bigger drops on the way. If you would sell during a crash, you are holding too much risk, not too little.",
            "Nobody can promise a return. Anyone who does — especially with urgency — is selling you something, not helping you."
          ],
          hi: [
            "Index fund ek saath kai companies kharidta hai, toh ek company doobne se poora paisa nahi doobta. Isko diversification kehte hain, aur yeh sabse badi free lunch hai.",
            "Zyada expected return ke saath raste mein bade girne bhi aate hain. Agar crash mein aap bech doge, toh aapne zarurat se zyada risk liya hai, kam nahi.",
            "Koi bhi guaranteed return promise nahi kar sakta. Jo kare — khaas kar jaldi karne ke liye pressure daale — woh aapko kuch bech raha hai, madad nahi."
          ]
        },
        note: {
          en: "Invest only money you will not need for several years. Short-term money belongs in a savings account, not the market.",
          hi: "Sirf woh paisa invest karo jo kai saal tak nahi chahiye. Short-term paisa savings account ka hai, market ka nahi."
        },
        deep: {
          en: [
            "Stocks are part-ownership of companies, bonds are loans, and cash is safety. An index fund holds many companies in one purchase, usually at a low fee. The fee looks small but compounds against you for decades.",
            "Risk and time horizon belong together. Money you need in two years does not belong in stocks; money you will not touch for ten can ride out a crash. If a 30% drop would make you sell, hold less stock; that is the honest test.",
            "Red flags repeat: guaranteed high returns, urgency, unregistered advisers, and 'everyone is doing it'. Check the regulator's register, read the fee sheet, and be suspicious of anything you cannot explain to a friend in one minute."
          ],
          hi: [
            "Stocks companies mein hissdari hain, bonds loan hain, aur cash safety. Index fund ek hi kharid mein kai companies rakhta hai, aksar kam fee par. Fee chhoti lagti hai par decades tak aapke khilaaf compound hoti hai.",
            "Risk aur time horizon saath chalte hain. Do saal mein chahiye paisa stocks mein nahi jaata; das saal tak na chhune wala paisa crash jhel sakta hai. Agar 30% giraavat par aap bech doge, toh kam stock rakho; yeh imandaar test hai.",
            "Red flags repeat hote hain: guaranteed high return, jaldi ka pressure, unregistered adviser, aur 'sab kar rahe hain'. Regulator ka register check karo, fee sheet padho, aur jo cheez dost ko ek minute mein samjha na sako uspar shak karo."
          ]
        },
        master: {
          en: ["Case: you need a house deposit in 18 months. Keep it in a savings account, not stocks. A 30% drop right before the purchase has no time to recover, and the date will not wait for the market."],
          hi: ["Case: ghar ka deposit 18 mahine mein chahiye. Usko savings account mein rakho, stocks mein nahi. Kharidne se thik pehle 30% giraavat recover hone ka time nahi hota, aur date market ka intezaar nahi karegi."]
        },
        quiz: {
          q: { en: "What is diversification?", hi: "Diversification kya hai?" },
          options: {
            en: ["Putting all money in one stock", "Spreading money across many investments", "Only buying gold"],
            hi: ["Saara paisa ek stock mein", "Paisa kai investments mein baantna", "Sirf sona kharidna"]
          },
          answer: 1,
          why: {
            en: "Spreading reduces the damage any single failure can do.",
            hi: "Baantne se kisi ek failure ka nuksan kam hota hai."
          }
        }
      }
    ]
  },

  {
    id: "speaking",
    title: "Public Speaking",
    accent: "#5ea8ff",
    x: 18, y: 66,
    blurb: "Say it clearly, even when your hands are shaking.",
    fact: "People remember a story far better than a list of facts — even a short one.",
    links: ["money", "networking"],
    lessons: [
      {
        title: "Nerves are normal",
        mins: 10,
        bullets: {
          en: [
            "Adrenaline before speaking is the same system that helps you perform. The goal is not zero nerves; it is using the energy.",
            "Slow your exhale for a few breaths. A longer out-breath signals safety and brings your voice down.",
            "Prepare the first 30 seconds properly. Confidence mostly comes from a strong start, not from feeling calm."
          ],
          hi: [
            "Bolne se pehle adrenaline wahi system hai jo perform karne mein help karta hai. Goal zero nerves nahi; energy use karna hai.",
            "Kuch saans dheere chhodo. Lambi exhale body ko safe signal deti hai aur awaaz neeche aati hai.",
            "Pehle 30 seconds acche se prepare karo. Confidence mostly strong start se aata hai, calm feel karne se nahi."
          ]
        },
        note: {
          en: "Nearly everyone in the room wants you to do well. They are not scoring you; they are waiting for something useful.",
          hi: "Room mein lagbhag sab chahte hain ki aap accha karo. Woh aapko score nahi kar rahe; kisi useful cheez ka intezaar kar rahe hain."
        },
        deep: {
          en: [
            "Adrenaline raises your heart rate, dries your mouth and can make your voice shake. Those are signs your body is preparing, not signs you will fail. Reframing the feeling as excitement works better than telling yourself to calm down.",
            "A slow exhale is the fastest physical lever: breathe in for four, out for six, a few times. It lowers arousal enough to steady your voice. Do it before you stand, not while you are speaking.",
            "Confidence is built by repetition in gradually harder settings: a friend, a small group, a recorded video, then the real room. Rehearse the first 30 seconds until they are automatic; a strong start buys you time to settle."
          ],
          hi: [
            "Adrenaline heart rate badhata hai, muh sookhta hai aur awaaz kaanp sakti hai. Yeh signs hain ki body taiyaar ho rahi hai, yeh nahi ki aap fail honge. Feeling ko excitement ke roop mein dekhna 'calm down' kehne se behtar kaam karta hai.",
            "Dheeri exhale sabse tez physical lever hai: chaar par saans lo, chhe par chhodo, kuch baar. Isse arousal itna kam hota hai ki awaaz stabil ho. Khade hone se pehle karo, bolte waqt nahi.",
            "Confidence mushkil hoti settings mein repetition se banta hai: dost, chhota group, recorded video, phir asli room. Pehle 30 seconds ko automatic hone tak rehearse karo; strong start aapko settle hone ka time deta hai."
          ]
        },
        master: {
          en: ["Case: your voice shakes in the first minute. Slow the exhale, slow the pace, and make the first sentence short. The shake fades once your body settles; fighting it keeps the arousal high."],
          hi: ["Case: pehle minute mein awaaz kaanpti hai. Exhale dheeri karo, pace slow karo, aur pehla sentence chhota rakho. Body settle hote hi kaanpna kam hota hai; usse ladne se arousal badhta hai."]
        },
        quiz: {
          q: { en: "What is the realistic goal for nerves before speaking?", hi: "Bolne se pehle nerves ka realistic goal kya hai?" },
          options: {
            en: ["Eliminate them", "Use the energy", "Hide them completely"],
            hi: ["Unhe khatam karna", "Energy use karna", "Poori tarah chhupana"]
          },
          answer: 1,
          why: {
            en: "The physical arousal helps performance when you work with it instead of fighting it.",
            hi: "Physical arousal performance mein help karti hai jab aap uske saath kaam karo, usse ladne ke bajaye."
          }
        }
      },
      {
        title: "One message, three points",
        mins: 12,
        bullets: {
          en: [
            "Decide the one sentence you want people to remember. If you cannot say it in one line, the talk is not ready.",
            "Support it with three points. Three is easy to hold in memory; ten is a list people forget.",
            "Open with the point and close by repeating it. Do not save the main idea for the end — people leave early mentally."
          ],
          hi: [
            "Ek line decide karo jo log yaad rakhein. Agar ek line mein nahi keh sakte, talk ready nahi hai.",
            "Uske liye teen points do. Teen yaad rehte hain; das ki list log bhool jaate hain.",
            "Shuru mein point bolo aur end mein dohrao. Main idea end ke liye mat bachao — log dimaag se pehle nikal jaate hain."
          ]
        },
        note: {
          en: "Slides support the speaker. If your slide can be read instead of heard, the slide is doing your job.",
          hi: "Slides speaker ko support karti hain. Agar slide padhi ja sakti hai sunne ke bajaye, toh slide aapka kaam kar rahi hai."
        },
        deep: {
          en: [
            "Start with the audience: what do they already know, what do they need to decide, and what do they fear? One sentence that answers 'so what?' for them is your message. If you cannot write it, you are not ready to design slides.",
            "A reliable structure is hook, point, three supports, call to action. Each support should be one story, one number or one example, not all three at once. Say the point at the start and repeat it at the end; people remember the frame.",
            "Cut anything that does not serve the message: the second anecdote, the extra slide, the joke that needs explaining. A short talk that lands beats a complete one that nobody can repeat. Rehearse out loud; slides hide weak transitions."
          ],
          hi: [
            "Audience se shuru karo: unhe kya pata hai, kya decide karna hai, aur kis baat ka dar hai? Unke liye 'so what?' ka jawab dene wala ek sentence hi aapka message hai. Woh likh na sako toh slides design karne ke liye ready nahi.",
            "Ek reliable structure hai: hook, point, teen supports, call to action. Har support ek story, ek number ya ek example ho, teeno ek saath nahi. Point shuru mein bolo aur end mein dohrao; log frame yaad rakhte hain.",
            "Jo message ko serve na kare woh cut karo: dusra anecdote, extra slide, samjhane wala joke. Chhoti talk jo land kare, us poori talk se behtar hai jo koi dohra na sake. Zor se rehearse karo; slides weak transitions chhupati hain."
          ]
        },
        master: {
          en: ["Case: you have ten slides for a five-minute talk. Cut to one message and three supports; one slide per 30 seconds is a rehearsal problem, not a content problem. A tight talk with space beats a rushed complete one."],
          hi: ["Case: paanch minute ki talk ke liye das slides hain. Ek message aur teen supports par cut karo; har 30 second par slide rehearsal ki problem hai, content ki nahi. Thodi jagah wali tight talk rushed poori talk se behtar hai."]
        },
        quiz: {
          q: { en: "How many main points should a short talk usually have?", hi: "Chhoti talk mein aksar kitne main points hone chahiye?" },
          options: {
            en: ["As many as possible", "Three", "One per slide"],
            hi: ["Jitne ho sake", "Teen", "Har slide par ek"]
          },
          answer: 1,
          why: {
            en: "Three points are memorable and still give enough support for the main idea.",
            hi: "Teen points yaad rehte hain aur main idea ko kaafi support dete hain."
          }
        }
      },
      {
        title: "Delivery",
        mins: 12,
        bullets: {
          en: [
            "Pause instead of filling silence with 'um'. A short pause looks thoughtful and gives people time to absorb.",
            "Speak to one person at a time for a sentence or two, then move. Eye contact in short holds feels natural.",
            "Vary pace and volume. A monotone loses a room faster than imperfect grammar."
          ],
          hi: [
            "'Um' se silence bharne ke bajaye pause lo. Chhota pause thoughtful lagta hai aur log samajh paate hain.",
            "Ek waqt mein ek insaan se ek-do line bolo, phir aage badho. Chhoti-chhoti eye contact natural lagti hai.",
            "Pace aur volume badalte raho. Monotone room kho deta hai, galtiyon wali grammar se bhi tez."
          ]
        },
        note: {
          en: "Record yourself on your phone once. You will fix in five minutes what friends are too polite to mention.",
          hi: "Ek baar apna phone par recording karo. Jo dost sharm se nahi batate, woh aap paanch minute mein sudhaar loge."
        },
        deep: {
          en: [
            "Pace around 130 to 150 words a minute leaves room to breathe. Pause at the end of a key sentence; silence feels long to you and normal to the room. Vary volume for emphasis instead of speeding up.",
            "Plant your feet, keep gestures below shoulder height, and hold eye contact for one sentence at a time. Move with a purpose (three positions, not pacing). Your hands will settle once they have something to do.",
            "Prepare for the first question and the worst question. Repeat the question so everyone hears it, answer in two sentences, then stop. 'I do not know, I will find out' is a strong answer when it is honest."
          ],
          hi: [
            "130 se 150 words per minute ki pace saans lene ki jagah deti hai. Key sentence ke end par pause lo; aapko silence lambi lagti hai, room ko normal. Emphasis ke liye volume badlo, speed nahi.",
            "Pairon ko zameen par sthir rakho, gestures kandhon se neeche, aur ek sentence tak eye contact rakho. Purpose ke saath chalo (teen positions, pacing nahi). Haathon ko kaam mil jaye toh woh khud settle ho jaate hain.",
            "Pehle sawaal aur sabse mushkil sawaal ki taiyari karo. Sawaal dohrao taaki sab sunein, do sentence mein jawab do, phir ruk jao. 'Mujhe nahi pata, main pata karunga' imandaar ho toh strong answer hai."
          ]
        },
        master: {
          en: ["Case: a question comes in with a hostile tone. Repeat it neutrally, answer only the real part, and park the rest. Matching the tone loses the room; the audience is judging your calm, not the questioner."],
          hi: ["Case: sawaal hostile tone mein aata hai. Usko neutral tareeqe se dohrao, sirf asli hissa answer karo, baaki park karo. Tone match karne se room kho jaata hai; audience aapka calm dekh rahi hai, sawaal wale ko nahi."]
        },
        quiz: {
          q: { en: "What is better than saying 'um' while thinking?", hi: "Sochte waqt 'um' kehne se behtar kya hai?" },
          options: {
            en: ["Speaking faster", "A short pause", "Looking down"],
            hi: ["Tez bolna", "Chhota pause", "Neeche dekhna"]
          },
          answer: 1,
          why: {
            en: "A pause reads as control. Filler words read as uncertainty.",
            hi: "Pause control dikhata hai. Filler words uncertainty dikhate hain."
          }
        }
      },
      {
        title: "Questions and practice",
        mins: 12,
        bullets: {
          en: [
            "Repeat the question in your own words before answering. It buys a second and confirms you understood.",
            "If you do not know, say so and say how you would find out. That reads as competence, not weakness.",
            "Rehearse out loud, standing, at least twice. Silent reading does not train your mouth or your timing."
          ],
          hi: [
            "Answer dene se pehle question apne words mein dohrao. Ek second milta hai aur confirm hota hai ki aap samjhe.",
            "Agar nahi pata, bol do aur bolo ki kaise pata karoge. Yeh kamzori nahi, competence lagta hai.",
            "Kam se kam do baar khade hokar zor se practice karo. Chup-chaap padhna na muh train karta hai na timing."
          ]
        },
        note: {
          en: "Practice the transitions, not just the content. Most stumbles happen between points, not inside them.",
          hi: "Sirf content nahi, transitions bhi practice karo. Zyadatar atakna points ke beech hota hai, andar nahi."
        },
        deep: {
          en: [
            "Do at least two full run-throughs out loud, timed, standing up. Record the second one and watch it with the sound off first; you will see pacing and filler habits your ears miss. Then watch it again with sound.",
            "Ask for specific feedback: one thing to keep, one thing to change, and where attention dropped. 'It was good' teaches nothing. Give the reviewer your goal so they judge the talk you meant to give.",
            "Plan for failure: slides that will not open, a microphone that dies, a demo that fails. Have a one-page outline and a sentence to say while you fix it. If you lose your place, pause, look at your points, and continue; the room will not remember the gap."
          ],
          hi: [
            "Kam se kam do baar poora run-through zor se, time karke, khade hokar karo. Dusra record karo aur pehle bina awaaz dekho; pacing aur filler habits dikhengi jo kaan miss karte hain. Phir awaaz ke saath dobara dekho.",
            "Specific feedback maango: ek cheez jo rakhein, ek jo badlein, aur kahan dhyaan bhatka. 'Accha tha' kuch nahi sikhata. Reviewer ko apna goal batao taaki woh usi talk ko judge kare jo aap dena chahte the.",
            "Failure ke liye plan rakho: slides na khulein, mic mar jaye, demo fail ho. Ek page ka outline aur fix karte waqt bolne ke liye ek sentence rakho. Jagah kho jaye toh pause lo, apne points dekho, aur continue karo; room gap yaad nahi rakhta."
          ]
        },
        master: {
          en: ["Case: the projector dies mid-talk. Keep going with your one-page outline; the audience came for you, not the slides. Have a sentence ready to say while it is fixed, and never apologise for more than five seconds."],
          hi: ["Case: talk ke beech projector mar jaata hai. Ek page ke outline ke saath continue karo; audience aapke liye aayi hai, slides ke liye nahi. Fix hone tak bolne ke liye ek sentence rakho, aur paanch second se zyada apology mat karo."]
        },
        quiz: {
          q: { en: "What should you do if you don't know an answer?", hi: "Agar answer nahi pata toh kya karna chahiye?" },
          options: {
            en: ["Invent something", "Admit it and say how you'd find out", "Change the topic"],
            hi: ["Kuch bana do", "Maano aur bolo ki kaise pata karoge", "Topic badal do"]
          },
          answer: 1,
          why: {
            en: "Honesty plus a plan is credible. Inventing an answer is the one thing people remember.",
            hi: "Imaandari plus plan credible lagta hai. Answer bana dena hi ek cheez hai jo log yaad rakhte hain."
          }
        }
      }
    ]
  },
  {
    id: "space",
    title: "Space & Astronomy",
    accent: "#5b9dff",
    x: 12, y: 17,
    blurb: "Exploring planets, stars, galaxies and the universe beyond Earth.",
    fact: "The Sun is so large that about 1.3 million Earths could fit inside it.",
    links: ["quantum", "mathematics", "engineering"],
    lessons: [
      {
        title: "Introduction to Space & Astronomy",
        mins: 14,
        bullets: {
          en: [
            "Space & Astronomy is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Space & Astronomy ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Space & Astronomy to a real situation you face this week."],
          hi: ["Case: Space & Astronomy ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Space & Astronomy?", hi: "Space & Astronomy seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Space & Astronomy",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Space & Astronomy to a friend in simple words."],
          hi: ["Case: Space & Astronomy ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Space & Astronomy?", hi: "Space & Astronomy seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Space & Astronomy",
        mins: 14,
        bullets: {
          en: [
            "Apply Space & Astronomy concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Space & Astronomy ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Space & Astronomy this week."],
          hi: ["Case: is week Space & Astronomy use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "volcano",
    title: "Volcanoes & Geology",
    accent: "#ff6b4a",
    x: 33, y: 14,
    blurb: "How volcanoes form, erupt and shape the Earth's surface.",
    fact: "The 1883 eruption of Krakatoa was heard 3,000 miles away.",
    links: ["geography", "climate", "engineering"],
    lessons: [
      {
        title: "Introduction to Volcanoes & Geology",
        mins: 14,
        bullets: {
          en: [
            "Volcanoes & Geology is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Volcanoes & Geology ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Volcanoes & Geology to a real situation you face this week."],
          hi: ["Case: Volcanoes & Geology ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Volcanoes & Geology?", hi: "Volcanoes & Geology seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Volcanoes & Geology",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Volcanoes & Geology to a friend in simple words."],
          hi: ["Case: Volcanoes & Geology ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Volcanoes & Geology?", hi: "Volcanoes & Geology seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Volcanoes & Geology",
        mins: 14,
        bullets: {
          en: [
            "Apply Volcanoes & Geology concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Volcanoes & Geology ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Volcanoes & Geology this week."],
          hi: ["Case: is week Volcanoes & Geology use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "medicine",
    title: "Medicine & Health",
    accent: "#ff5d8f",
    x: 52, y: 18,
    blurb: "How the human body works and how we keep it healthy.",
    fact: "The human body has about 37 trillion cells.",
    links: ["biology", "chemistry", "psychology"],
    lessons: [
      {
        title: "Introduction to Medicine & Health",
        mins: 14,
        bullets: {
          en: [
            "Medicine & Health is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Medicine & Health ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Medicine & Health to a real situation you face this week."],
          hi: ["Case: Medicine & Health ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Medicine & Health?", hi: "Medicine & Health seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Medicine & Health",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Medicine & Health to a friend in simple words."],
          hi: ["Case: Medicine & Health ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Medicine & Health?", hi: "Medicine & Health seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Medicine & Health",
        mins: 14,
        bullets: {
          en: [
            "Apply Medicine & Health concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Medicine & Health ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Medicine & Health this week."],
          hi: ["Case: is week Medicine & Health use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "law",
    title: "Law & Justice",
    accent: "#a0a0ff",
    x: 73, y: 18,
    blurb: "How laws are made, interpreted and enforced in society.",
    fact: "The Code of Hammurabi, written around 1754 BC, is one of the oldest legal codes.",
    links: ["economics", "history", "psychology"],
    lessons: [
      {
        title: "Introduction to Law & Justice",
        mins: 14,
        bullets: {
          en: [
            "Law & Justice is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Law & Justice ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Law & Justice to a real situation you face this week."],
          hi: ["Case: Law & Justice ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Law & Justice?", hi: "Law & Justice seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Law & Justice",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Law & Justice to a friend in simple words."],
          hi: ["Case: Law & Justice ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Law & Justice?", hi: "Law & Justice seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Law & Justice",
        mins: 14,
        bullets: {
          en: [
            "Apply Law & Justice concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Law & Justice ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Law & Justice this week."],
          hi: ["Case: is week Law & Justice use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "computerscience",
    title: "Computer Science",
    accent: "#2ee6d6",
    x: 91, y: 12,
    blurb: "How computers think, store data and solve problems.",
    fact: "The first computer bug was an actual moth found in a Harvard computer in 1947.",
    links: ["python", "ai", "mathematics"],
    lessons: [
      {
        title: "Introduction to Computer Science",
        mins: 14,
        bullets: {
          en: [
            "Computer Science is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Computer Science ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Computer Science to a real situation you face this week."],
          hi: ["Case: Computer Science ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Computer Science?", hi: "Computer Science seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Computer Science",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Computer Science to a friend in simple words."],
          hi: ["Case: Computer Science ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Computer Science?", hi: "Computer Science seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Computer Science",
        mins: 14,
        bullets: {
          en: [
            "Apply Computer Science concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Computer Science ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Computer Science this week."],
          hi: ["Case: is week Computer Science use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "biology",
    title: "Biology",
    accent: "#4ade80",
    x: 7, y: 38,
    blurb: "The study of living organisms and life processes.",
    fact: "A single teaspoon of soil contains more microorganisms than there are people on Earth.",
    links: ["medicine", "chemistry", "gardening"],
    lessons: [
      {
        title: "Introduction to Biology",
        mins: 14,
        bullets: {
          en: [
            "Biology is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Biology ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Biology to a real situation you face this week."],
          hi: ["Case: Biology ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Biology?", hi: "Biology seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Biology",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Biology to a friend in simple words."],
          hi: ["Case: Biology ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Biology?", hi: "Biology seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Biology",
        mins: 14,
        bullets: {
          en: [
            "Apply Biology concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Biology ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Biology this week."],
          hi: ["Case: is week Biology use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "chemistry",
    title: "Chemistry",
    accent: "#fbbf24",
    x: 27, y: 39,
    blurb: "Atoms, molecules and the reactions that build everything.",
    fact: "Water is the only substance that exists naturally in all three states on Earth.",
    links: ["biology", "medicine", "cooking"],
    lessons: [
      {
        title: "Introduction to Chemistry",
        mins: 14,
        bullets: {
          en: [
            "Chemistry is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Chemistry ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Chemistry to a real situation you face this week."],
          hi: ["Case: Chemistry ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Chemistry?", hi: "Chemistry seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Chemistry",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Chemistry to a friend in simple words."],
          hi: ["Case: Chemistry ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Chemistry?", hi: "Chemistry seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Chemistry",
        mins: 14,
        bullets: {
          en: [
            "Apply Chemistry concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Chemistry ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Chemistry this week."],
          hi: ["Case: is week Chemistry use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "history",
    title: "History",
    accent: "#c084fc",
    x: 53, y: 39,
    blurb: "How past events shaped the world we live in today.",
    fact: "The Great Wall of China is not visible from space with the naked eye.",
    links: ["geography", "literature", "law"],
    lessons: [
      {
        title: "Introduction to History",
        mins: 14,
        bullets: {
          en: [
            "History is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "History ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from History to a real situation you face this week."],
          hi: ["Case: History ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning History?", hi: "History seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in History",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from History to a friend in simple words."],
          hi: ["Case: History ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning History?", hi: "History seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: History",
        mins: 14,
        bullets: {
          en: [
            "Apply History concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "History ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using History this week."],
          hi: ["Case: is week History use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "geography",
    title: "Geography",
    accent: "#38bdf8",
    x: 67, y: 37,
    blurb: "Earth's landscapes, climates and the people who live in them.",
    fact: "Russia spans 11 time zones.",
    links: ["climate", "history", "volcano"],
    lessons: [
      {
        title: "Introduction to Geography",
        mins: 14,
        bullets: {
          en: [
            "Geography is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Geography ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Geography to a real situation you face this week."],
          hi: ["Case: Geography ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Geography?", hi: "Geography seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Geography",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Geography to a friend in simple words."],
          hi: ["Case: Geography ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Geography?", hi: "Geography seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Geography",
        mins: 14,
        bullets: {
          en: [
            "Apply Geography concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Geography ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Geography this week."],
          hi: ["Case: is week Geography use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "economics",
    title: "Economics",
    accent: "#34d399",
    x: 89, y: 36,
    blurb: "How money, trade and resources flow through society.",
    fact: "The word 'salary' comes from the Latin 'salarium', meaning salt money.",
    links: ["money", "law", "mathematics"],
    lessons: [
      {
        title: "Introduction to Economics",
        mins: 14,
        bullets: {
          en: [
            "Economics is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Economics ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Economics to a real situation you face this week."],
          hi: ["Case: Economics ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Economics?", hi: "Economics seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Economics",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Economics to a friend in simple words."],
          hi: ["Case: Economics ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Economics?", hi: "Economics seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Economics",
        mins: 14,
        bullets: {
          en: [
            "Apply Economics concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Economics ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Economics this week."],
          hi: ["Case: is week Economics use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "psychology",
    title: "Psychology",
    accent: "#f472b6",
    x: 10, y: 62,
    blurb: "How the mind works, thinks, feels and behaves.",
    fact: "The human brain uses about 20% of the body's total energy.",
    links: ["medicine", "speaking", "art"],
    lessons: [
      {
        title: "Introduction to Psychology",
        mins: 14,
        bullets: {
          en: [
            "Psychology is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Psychology ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Psychology to a real situation you face this week."],
          hi: ["Case: Psychology ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Psychology?", hi: "Psychology seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Psychology",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Psychology to a friend in simple words."],
          hi: ["Case: Psychology ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Psychology?", hi: "Psychology seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Psychology",
        mins: 14,
        bullets: {
          en: [
            "Apply Psychology concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Psychology ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Psychology this week."],
          hi: ["Case: is week Psychology use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "art",
    title: "Art & Design",
    accent: "#fb923c",
    x: 32, y: 59,
    blurb: "How humans create visual meaning, beauty and expression.",
    fact: "The Mona Lisa has no visible eyebrows — they were likely removed during a restoration.",
    links: ["music", "literature", "history"],
    lessons: [
      {
        title: "Introduction to Art & Design",
        mins: 14,
        bullets: {
          en: [
            "Art & Design is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Art & Design ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Art & Design to a real situation you face this week."],
          hi: ["Case: Art & Design ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Art & Design?", hi: "Art & Design seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Art & Design",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Art & Design to a friend in simple words."],
          hi: ["Case: Art & Design ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Art & Design?", hi: "Art & Design seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Art & Design",
        mins: 14,
        bullets: {
          en: [
            "Apply Art & Design concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Art & Design ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Art & Design this week."],
          hi: ["Case: is week Art & Design use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "music",
    title: "Music",
    accent: "#e879f9",
    x: 47, y: 59,
    blurb: "Sound, rhythm, melody and the art of listening.",
    fact: "The oldest known musical instrument is a flute made from a bear bone, about 43,000 years old.",
    links: ["art", "speaking", "psychology"],
    lessons: [
      {
        title: "Introduction to Music",
        mins: 14,
        bullets: {
          en: [
            "Music is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Music ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Music to a real situation you face this week."],
          hi: ["Case: Music ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Music?", hi: "Music seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Music",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Music to a friend in simple words."],
          hi: ["Case: Music ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Music?", hi: "Music seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Music",
        mins: 14,
        bullets: {
          en: [
            "Apply Music concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Music ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Music this week."],
          hi: ["Case: is week Music use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "sports",
    title: "Sports",
    accent: "#22d3ee",
    x: 73, y: 56,
    blurb: "How athletic competition builds skill, teamwork and resilience.",
    fact: "The Olympic Games began in 776 BC in Olympia, Greece.",
    links: ["psychology", "medicine", "cooking"],
    lessons: [
      {
        title: "Introduction to Sports",
        mins: 14,
        bullets: {
          en: [
            "Sports is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Sports ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Sports to a real situation you face this week."],
          hi: ["Case: Sports ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Sports?", hi: "Sports seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Sports",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Sports to a friend in simple words."],
          hi: ["Case: Sports ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Sports?", hi: "Sports seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Sports",
        mins: 14,
        bullets: {
          en: [
            "Apply Sports concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Sports ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Sports this week."],
          hi: ["Case: is week Sports use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "cooking",
    title: "Cooking",
    accent: "#facc15",
    x: 88, y: 60,
    blurb: "How heat, chemistry and technique turn ingredients into meals.",
    fact: "The Maillard reaction, responsible for browning, happens above 140°C.",
    links: ["chemistry", "biology", "gardening"],
    lessons: [
      {
        title: "Introduction to Cooking",
        mins: 14,
        bullets: {
          en: [
            "Cooking is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Cooking ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Cooking to a real situation you face this week."],
          hi: ["Case: Cooking ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Cooking?", hi: "Cooking seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Cooking",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Cooking to a friend in simple words."],
          hi: ["Case: Cooking ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Cooking?", hi: "Cooking seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Cooking",
        mins: 14,
        bullets: {
          en: [
            "Apply Cooking concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Cooking ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Cooking this week."],
          hi: ["Case: is week Cooking use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "gardening",
    title: "Gardening",
    accent: "#86efac",
    x: 7, y: 81,
    blurb: "How plants grow and how we cultivate them.",
    fact: "Bamboo can grow up to 91 cm in a single day.",
    links: ["biology", "climate", "cooking"],
    lessons: [
      {
        title: "Introduction to Gardening",
        mins: 14,
        bullets: {
          en: [
            "Gardening is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Gardening ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Gardening to a real situation you face this week."],
          hi: ["Case: Gardening ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Gardening?", hi: "Gardening seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Gardening",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Gardening to a friend in simple words."],
          hi: ["Case: Gardening ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Gardening?", hi: "Gardening seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Gardening",
        mins: 14,
        bullets: {
          en: [
            "Apply Gardening concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Gardening ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Gardening this week."],
          hi: ["Case: is week Gardening use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "climate",
    title: "Climate",
    accent: "#67e8f9",
    x: 29, y: 83,
    blurb: "Earth's weather patterns and how they are changing.",
    fact: "The last ice age ended about 11,700 years ago.",
    links: ["geography", "volcano", "gardening"],
    lessons: [
      {
        title: "Introduction to Climate",
        mins: 14,
        bullets: {
          en: [
            "Climate is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Climate ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Climate to a real situation you face this week."],
          hi: ["Case: Climate ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Climate?", hi: "Climate seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Climate",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Climate to a friend in simple words."],
          hi: ["Case: Climate ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Climate?", hi: "Climate seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Climate",
        mins: 14,
        bullets: {
          en: [
            "Apply Climate concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Climate ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Climate this week."],
          hi: ["Case: is week Climate use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "engineering",
    title: "Engineering",
    accent: "#94a3b8",
    x: 47, y: 83,
    blurb: "How we design and build structures, machines and systems.",
    fact: "The Eiffel Tower grows by about 15 cm in summer due to thermal expansion.",
    links: ["computerscience", "space", "mathematics"],
    lessons: [
      {
        title: "Introduction to Engineering",
        mins: 14,
        bullets: {
          en: [
            "Engineering is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Engineering ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Engineering to a real situation you face this week."],
          hi: ["Case: Engineering ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Engineering?", hi: "Engineering seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Engineering",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Engineering to a friend in simple words."],
          hi: ["Case: Engineering ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Engineering?", hi: "Engineering seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Engineering",
        mins: 14,
        bullets: {
          en: [
            "Apply Engineering concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Engineering ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Engineering this week."],
          hi: ["Case: is week Engineering use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "mathematics",
    title: "Mathematics",
    accent: "#a78bfa",
    x: 68, y: 78,
    blurb: "Numbers, patterns, logic and the language of the universe.",
    fact: "Zero was not always a number — it was invented in India around the 5th century.",
    links: ["computerscience", "engineering", "economics"],
    lessons: [
      {
        title: "Introduction to Mathematics",
        mins: 14,
        bullets: {
          en: [
            "Mathematics is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Mathematics ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Mathematics to a real situation you face this week."],
          hi: ["Case: Mathematics ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Mathematics?", hi: "Mathematics seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Mathematics",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Mathematics to a friend in simple words."],
          hi: ["Case: Mathematics ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Mathematics?", hi: "Mathematics seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Mathematics",
        mins: 14,
        bullets: {
          en: [
            "Apply Mathematics concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Mathematics ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Mathematics this week."],
          hi: ["Case: is week Mathematics use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  },
  {
    id: "literature",
    title: "Literature",
    accent: "#fda4af",
    x: 91, y: 83,
    blurb: "Stories, poetry and the power of written words.",
    fact: "The shortest novel ever published is 'The Dinosaur' by Augusto Monterroso — one sentence.",
    links: ["history", "art", "psychology"],
    lessons: [
      {
        title: "Introduction to Literature",
        mins: 14,
        bullets: {
          en: [
            "Literature is a vast field with many branches and applications.",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "Literature ek bada field hai jisme bahut branches aur applications hain.",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        },
        note: {
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        },
        deep: {
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        },
        master: {
          en: ["Case: apply one concept from Literature to a real situation you face this week."],
          hi: ["Case: Literature ka ek concept apne is week ki real situation mein apply karo."]
        },
        quiz: {
          q: { en: "What is the best way to start learning Literature?", hi: "Literature seekhna shuru karne ka best tarika kya hai?" },
          options: {
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          },
          answer: 1,
          why: {
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }
        }
      },
      {
        title: "Key ideas in Literature",
        mins: 14,
        bullets: {
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        },
        note: {
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        },
        deep: {
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        },
        master: {
          en: ["Case: explain one concept from Literature to a friend in simple words."],
          hi: ["Case: Literature ka ek concept simple words mein friend ko samjhao."]
        },
        quiz: {
          q: { en: "Which habit helps most in learning Literature?", hi: "Literature seekhne mein kaunsi habit sabse zyada help karti hai?" },
          options: {
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          },
          answer: 1,
          why: {
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }
        }
      },
      {
        title: "Case study: Literature",
        mins: 14,
        bullets: {
          en: [
            "Apply Literature concepts to a real-world scenario.",
            "Identify the problem, gather data, and test your hypothesis.",
            "Reflect on what worked and what to improve next time."
          ],
          hi: [
            "Literature ke concepts real-world scenario mein apply karo.",
            "Problem identify karo, data gather karo, hypothesis test karo.",
            "Kya kaam aaya aur kya improve karna hai reflect karo."
          ]
        },
        note: {
          en: "Case studies turn theory into practical skill.",
          hi: "Case studies theory ko practical skill mein convert karti hain."
        },
        deep: {
          en: [
            "Real problems are messier than textbook examples.",
            "Collaboration often beats solo effort.",
            "Documenting your process helps future learning."
          ],
          hi: [
            "Real problems textbook examples se messier hote hain.",
            "Collaboration often solo effort se better hoti hai.",
            "Apna process document karna future learning help karta hai."
          ]
        },
        master: {
          en: ["Case: solve a small real problem using Literature this week."],
          hi: ["Case: is week Literature use karke ek chhota real problem solve karo."]
        },
        quiz: {
          q: { en: "What makes a good case study?", hi: "Ek good case study kya banata hai?" },
          options: {
            en: ["Only theory", "Real problem + reflection", "Skipping steps"],
            hi: ["Sirf theory", "Real problem + reflection", "Steps skip karna"]
          },
          answer: 1,
          why: {
            en: "A good case study combines a real problem with honest reflection.",
            hi: "Ek good case study real problem ko honest reflection ke saath combine karta hai."
          }
        }
      }
    ]
  }
];

if (typeof module !== "undefined") module.exports = { TOPICS };
