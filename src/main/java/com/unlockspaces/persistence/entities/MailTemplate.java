package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class MailTemplate implements Serializable {

    public enum MailTemplateEnum {
        
        RENT_REQUEST(new MailTemplate("Rent_Request")),
        REQUEST_REJECTED(new MailTemplate("Request_Rejected")),
        REQUEST_ACCEPTED(new MailTemplate("Request_Accepted")),
        RENT_CANCELLED_BY_CLIENT(new MailTemplate("Rent_Cancelled_by_Client")),
        RENT_CANCELLED_BY_OWNER(new MailTemplate("Rent_Cancelled_by_Owner")),
        PAYMENT(new MailTemplate("Payment"));
       

        private MailTemplateEnum(MailTemplate mailTemplate) {
            this.mailTemplate = mailTemplate;
        }

        private MailTemplate mailTemplate;

        /**
         * @return the mailTemplate
         */
        public MailTemplate getMailTemplate() {
            return mailTemplate;
        }

    }
    
    @Id
    @Basic
    private String name;

    @Basic
    private String template;

    public MailTemplate(String name) {
        this.name = name;
    }

    public MailTemplate() {

    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the template
     */
    public String getTemplate() {
        return template;
    }

    /**
     * @param template the template to set
     */
    public void setTemplate(String template) {
        this.template = template;
    }
}
