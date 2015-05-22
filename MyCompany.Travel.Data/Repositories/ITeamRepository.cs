﻿namespace MyCompany.Travel.Data.Repositories
{
    using System.Collections.Generic;
    using MyCompany.Travel.Model;
    using System.Threading.Tasks;
    using System;

    /// <summary>
    /// Base contract for team repository
    /// </summary>
    public interface ITeamRepository : IDisposable
    {
        /// <summary>
        /// Get team by Id
        /// </summary>
        /// <param name="teamId"></param>
        /// <returns></returns>
        Task<Team> GetAsync(int teamId);

        /// <summary>
        /// Get All teams
        /// </summary>
        /// <returns>List of teams</returns>
        Task<IEnumerable<Team>> GetAllAsync();

        /// <summary>
        /// Add new team
        /// </summary>
        /// <param name="team">team information</param>
        /// <returns>teamId</returns>
        Task<int> AddAsync(Team team);

        /// <summary>
        /// Update team
        /// </summary>
        /// <param name="team">team information</param>
        Task UpdateAsync(Team team);

        /// <summary>
        /// Delete team
        /// </summary>
        /// <param name="teamId">team to delete</param>
        Task DeleteAsync(int teamId);
    }
}
