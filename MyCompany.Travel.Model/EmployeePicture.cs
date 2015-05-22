﻿

namespace MyCompany.Travel.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// Employee Picture Entity
    /// </summary>
    public class EmployeePicture
    {
        /// <summary>
        /// UniqueId
        /// </summary>
        public int EmployeePictureId { get; set; }

        /// <summary>
        /// Picture Type
        /// </summary>
        public PictureType PictureType { get; set; }

        /// <summary>
        /// Content
        /// </summary>
        public byte[] Content { get; set; }

        /// <summary>
        /// EmployeeId
        /// </summary>
        public int EmployeeId { get; set; }

        /// <summary>
        /// Employee
        /// </summary>
        public Employee Employee { get; set; }
    }
}
