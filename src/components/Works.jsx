import React from "react";
import {Tilt} from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useTranslation } from 'react-i18next';


const ProjectCard = ({
  index,
  name,
  name_es,
  description,
  description_es,
  tags,
  image,
  source_code_link,
  website_link
}) => {
  const [t, i18n] = useTranslation("global");
  return (
    <motion.div
      variants={fadeIn("up", "spring", index*0.5, 0.75)}  
    >
      <Tilt
        options={{
          max: 45,
          scale:1,
          speed: 450
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover  cursor-pointer" onClick={()=> window.open(website_link, "_blank")}>
            <div
              onClick={()=> window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-all hover:scale-110"
            >
              <img src={github} alt="github" 
                className="w-3/4 h-3/4 object-contain"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className=" text-white font-bold text-[24px] cursor-pointer" onClick={()=> window.open(website_link, "_blank")}>{i18n.language === 'en' ? name : name_es}</h3>
          <p className="mt-2 text-secondary text-[14px] whitespace-pre-line">{i18n.language === 'en' ? description : description_es}</p>
        </div>
        <div className="flex  justify-between items-center">
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map ((tag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}

          </div>
          <div className="mt-4 flex rounded-full px-4 border hover:scale-110 border-secondary hover:border-white text-secondary hover:text-white  cursor-pointer text-[14px] text-center bg-black-100 transition-all" onClick={()=> window.open(website_link, "_blank")}>{i18n.language === 'en' ? "View" : "Ver"}</div>
          
        </div>
        
      </Tilt>
    </motion.div>
  )
}
const Works = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t("works.subtitle")}</p>
        <h2 className={styles.sectionHeadText}>{t("works.title")}</h2>
    </motion.div>
    <div className='w-full flex'>
      <motion.p
        variants={fadeIn("", "", 0.1,1)}
        className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        {t("works.text")}
      </motion.p>

    </div>
    <div className='mt-20 flex flex-wrap gap-7'>
      {projects.map((project, index) => (
        <ProjectCard key={`project-${index}`}
        index={index}
        {...project}/>
      ))}
    </div>
    </>
  )
}

export default SectionWrapper(Works, "projects");