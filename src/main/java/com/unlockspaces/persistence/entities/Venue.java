package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
//@JsonPropertyOrder(value = {"",""})
@NamedQueries({
    @NamedQuery(name = "Venue.findAll", query = "SELECT o FROM Venue o")})
public class Venue implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private ContactInfo contactInfo;
    @Embedded
    private Address address;

    @Embedded
    private Overview overview;

    @Basic
    private String venueType;

    @Basic
    private String timezone;
    @Embedded
    private HoursOfOperation hoursOfOperation;

    @ElementCollection(fetch = FetchType.EAGER)
    private Collection<String> photos;
    @Basic
    private String venueLogo;
    @Basic
    private String frontPhoto;

    @ManyToOne(targetEntity = Usuario.class)
    private Usuario createdBy;
    @OneToOne(targetEntity = Organization.class)
    private Organization organization;
    @OneToMany(mappedBy = "venue", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Space> spaces;
    @Temporal(TemporalType.TIMESTAMP)
    @Basic
    @XmlTransient
    private Date creationDate;
    @Temporal(TemporalType.TIMESTAMP)
    @Basic
    @XmlTransient
    private Date lastModifDate;
    @Basic
    @XmlTransient
    private Double distance;

    //amenities
    @ManyToMany(targetEntity = Amenity.class)
    private Collection<Amenity> amenitiesAvailable;

    //admins
    @ElementCollection(fetch = FetchType.EAGER)
    private Collection<VenueAdmin> admins;

    public Venue() {
        this.overview = new Overview();
        this.address = new Address();
        this.contactInfo = new ContactInfo();
        this.distance = 0D;
        this.admins = new ArrayList<>();
    }

    public Overview getOverview() {
        return this.overview;
    }

    public void setOverview(Overview overview) {
        this.overview = overview;
    }

    public Address getAddress() {
        return this.address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public ContactInfo getContactInfo() {
        return this.contactInfo;
    }

    public void setContactInfo(ContactInfo contactInfo) {
        this.contactInfo = contactInfo;
    }

    public String getTimezone() {
        return this.timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public HoursOfOperation getHoursOfOperation() {
        return this.hoursOfOperation;
    }

    public void setHoursOfOperation(HoursOfOperation hoursOfOperation) {
        this.hoursOfOperation = hoursOfOperation;
    }

    public Date getCreationDate() {
        return this.creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Collection<String> getPhotos() {
        return this.photos;
    }

    public void setPhotos(Collection<String> photos) {
        this.photos = photos;
    }

    public String getVenueLogo() {
        return this.venueLogo;
    }

    public void setVenueLogo(String venueLogo) {
        this.venueLogo = venueLogo;
    }

    public Usuario getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Usuario createdBy) {
        this.createdBy = createdBy;
    }

    public Organization getOrganization() {
        return this.organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    @XmlTransient
    public List<Space> getSpaces() {
        return this.spaces;
    }

    public void setSpaces(List<Space> spaces) {
        this.spaces = spaces;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getLastModifDate() {
        return this.lastModifDate;
    }

    public void setLastModifDate(Date lastModifDate) {
        this.lastModifDate = lastModifDate;
    }

    public String getFrontPhoto() {
        return this.frontPhoto;
    }

    public void setFrontPhoto(String frontPhoto) {
        this.frontPhoto = frontPhoto;
    }

    @Override
    public String toString() {
        return "Venue{" + "overview=" + overview + ", address=" + address + ", contactInfo=" + contactInfo + ", timezone=" + timezone + ", hoursOfOperation=" + hoursOfOperation + ", creationDate=" + creationDate + ", distance=" + distance + ", photos=" + photos + ", venueLogo=" + venueLogo + ", createdBy=" + createdBy + ", organization=" + organization + ", spaces=" + spaces + ", id=" + id + ", lastModifDate=" + lastModifDate + ", frontPhoto=" + frontPhoto + '}';
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Venue) {
            return (Objects.equals(((Venue) obj).getId(), this.getId()));
        }
        return false;
    }

    /**
     * @return the distance
     */
    public Double getDistance() {
        return distance;
    }

    /**
     * @param distance the distance to set
     */
    public void setDistance(Double distance) {
        this.distance = distance;
    }

    /**
     * @return the venueType
     */
    public String getVenueType() {
        return venueType;
    }

    /**
     * @param venueType the venueType to set
     */
    public void setVenueType(String venueType) {
        this.venueType = venueType;
    }

    /**
     * @return the admins
     */
    public Collection<VenueAdmin> getAdmins() {
        return admins;
    }

    /**
     * @param admins the admins to set
     */
    public void setAdmins(Collection<VenueAdmin> admins) {
        this.admins = admins;
    }

    /**
     * @return the amenitiesAvailable
     */
    @XmlTransient
    public Collection<Amenity> getAmenitiesAvailable() {
        return amenitiesAvailable;
    }

    /**
     * @param amenitiesAvailable the amenitiesAvailable to set
     */
    public void setAmenitiesAvailable(Collection<Amenity> amenitiesAvailable) {
        this.amenitiesAvailable = amenitiesAvailable;
    }
}
