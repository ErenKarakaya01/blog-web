import React from "react"
import footerStyles from "../sass/footer.module.scss"

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footer_copyright}>
        © 2023 Company Name. All rights reserved.
      </div>

      <div className={footerStyles.footer_text}>
        Bu sitedeki tüm içerikler Digital Millennium Copyright Act ve 5846
        Sayılı Fikir ve Sanat Eserlerini Koruma Kanunu'na istinaden koruma
        altındadır. Buradaki hiçbir içerik (Yazı, Fotoğraf, Video vb.) site
        KULLANIM ŞARTLARI'nda da belirtildiği üzere izinsiz olarak kopyalanamaz,
        alıntı yapılamaz, başka yerde yayınlanamaz.
      </div>
    </footer>
  )
}

export default Footer
