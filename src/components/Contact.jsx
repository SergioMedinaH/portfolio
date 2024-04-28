import { motion } from 'framer-motion'
import {useState, useRef} from 'react'
import emailjs from '@emailjs/browser'
import { styles } from '../styles'
import { EarthCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../utils/motion'
import { useTranslation } from 'react-i18next'


const Contact = () => {
  const [t, i18n] = useTranslation("global");
  const formRef = useRef();
  const [form, setForm] = useState ({
    name:'',
    email: '',
    message: '',
  })
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const {name, value} = e.target
    setForm({...form, [name]:value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    // XEzQAT5SSJAaovHD2
    // template_1e35cd8
    // service_e3vhnlb

    emailjs.send(
      'service_e3vhnlb', 
      'template_1e35cd8',
      {
        from_name: form.name,
        to_name: 'Sergio',
        from_email: form.email,
        to_email: 'sergiomher@gmail.com',
        message: form.message,
      },
      'XEzQAT5SSJAaovHD2'
       )
       .then(() => {
        setLoading(false)
        alert(i18n.language === 'en' ? "Thank you. I will get back to you as soon as possible." : 'Gracias. Me podré en contacto contigo cuanto antes.')
        setForm({
          name:'',
          email:'',
          message:'',
        })
       }, (error) => {
        setLoading(false)
        console.log(error);
        alert(i18n.language === 'en' ? 'Ahh, something went wrong. Please try again writing me at sergiomher@gmail.com ': 'Uups, algo ha ido mal. Si no puedes contactar conmigo por aquí, escríbeme a sergiomher@gmail.com')
       })
  }


  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div variants={slideIn('left', "tween", 0.2, 1)}
      className='flex-[0.75] bg-black-100 p-8 rounded-2xl'>
        <p className={styles.sectionSubText}>{t("contact.subtitle")}</p>
        <h3 className={styles.sectionHeadText}>{t("contact.title")}</h3>
        <form
        ref={formRef}
        onSubmit={handleSubmit}
        className='mt-12 flex flex-col gap-8'>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>{t("contact.name")}</span>
            <input 
            type="text" 
            name='name'
            value={form.name}
            onChange={handleChange}
            placeholder={t("contact.name_placeholder")}
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>{t("contact.email")}</span>
            <input 
            type="email" 
            name='email'
            value={form.email}
            onChange={handleChange}
            placeholder={t("contact.email_placeholder")}
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>{t("contact.message")}</span>
            <textarea 
            rows="7"
            name='message'
            value={form.message}
            onChange={handleChange}
            placeholder={t("contact.message_placeholder")}
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <button
          type='submit'
          className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'>
            {loading ? t("contact.submitting") : t("contact.submit")}
          </button>
        </form>
      </motion.div>
      <motion.div variants={slideIn('right', "tween", 0.2, 1)}
      className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'>
        <EarthCanvas/>
      </motion.div>
    </div>
  )
}

export default SectionWrapper (Contact, "contact")