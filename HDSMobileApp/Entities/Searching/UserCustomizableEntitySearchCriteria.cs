﻿/* Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved. */

using System;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching
{
    /// <summary>
    /// <para>
    /// An entity class that represents the search criteria for user customizable entity.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable. And it is not thread-safe.
    /// </threadsafety>
    /// <author>Yeung</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    [DataContract]
    public abstract class UserCustomizableEntitySearchCriteria : SearchCriteria
    {
        /// <summary>
        /// Represents the last update date.
        /// </summary>
        private DateTime? lastUpdateDate;

        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="UserCustomizableEntitySearchCriteria"/> class.
        /// </para>
        /// </summary>
        protected UserCustomizableEntitySearchCriteria()
        {
        }

        /// <value>The number for the user of the application. It can hold any value.</value>
        [DataMember]
        public string UserIdentifier
        {
            get;
            set;
        }

        /// <value>The last update date. It can hold any value.</value>
        [DataMember]
        public DateTime? LastUpdateDate
        {
            get
            {
                return lastUpdateDate;
            }
            set
            {
                lastUpdateDate = value == null ? (DateTime?)null : DateTime.SpecifyKind(value.Value, DateTimeKind.Utc);
            }
        }
    }
}
