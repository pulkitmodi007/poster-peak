/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: contactsubmissions
 * Interface for ContactSubmissions
 */
export interface ContactSubmissions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  senderName?: string;
  /** @wixFieldType text */
  senderEmail?: string;
  /** @wixFieldType text */
  subject?: string;
  /** @wixFieldType text */
  message?: string;
  /** @wixFieldType datetime */
  submissionDateTime?: Date | string;
  /** @wixFieldType multi_reference */
  users?: Users[];
}


/**
 * Collection ID: orders
 * Interface for CustomerOrders
 */
export interface CustomerOrders {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  orderNumber?: string;
  /** @wixFieldType text */
  customerName?: string;
  /** @wixFieldType text */
  customerEmail?: string;
  /** @wixFieldType datetime */
  orderDate?: Date | string;
  /** @wixFieldType number */
  totalAmount?: number;
  /** @wixFieldType text */
  shippingStatus?: string;
  /** @wixFieldType text */
  razorpayTransactionId?: string;
  /** @wixFieldType text */
  shippingAddress?: string;
  /** @wixFieldType text */
  paymentStatus?: string;
  /** @wixFieldType multi_reference */
  users?: Users[];
}


/**
 * Collection ID: products
 * Interface for Products
 */
export interface Products {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  productName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType image */
  mainImage?: string;
  /** @wixFieldType text */
  sku?: string;
  /** @wixFieldType number */
  stockQuantity?: number;
  /** @wixFieldType boolean */
  isFeatured?: boolean;
}


/**
 * Collection ID: users
 * Interface for Users
 */
export interface Users {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType multi_reference */
  contactsubmissionids?: ContactSubmissions[];
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType multi_reference */
  orderids?: CustomerOrders[];
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType datetime */
  registrationDate?: Date | string;
  /** @wixFieldType datetime */
  lastLoginDate?: Date | string;
  /** @wixFieldType boolean */
  isAdmin?: boolean;
  /** @wixFieldType text */
  googleId?: string;
}
