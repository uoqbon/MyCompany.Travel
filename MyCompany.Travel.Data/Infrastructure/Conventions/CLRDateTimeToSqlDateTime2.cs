﻿
namespace MyCompany.Travel.Data.Infrastructure.Conventions
{
    using System;
    using System.Data.Entity.ModelConfiguration.Conventions;


    /// <summary>
    /// Convention to set all clr date time properties
    /// to datetime2 sql data type.
    /// </summary>
    class CLRDateTimeToSqlDateTime2
        : Convention
    {
        public CLRDateTimeToSqlDateTime2()
        {
            this.Properties<DateTime>()
                .Configure(p => p.HasColumnType("datetime2"));
        }
    }
}
