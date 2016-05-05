using AspNetAngularTemplate.Models;
using AspNetAngularTemplate.ViewModels;
using AutoMapper;

namespace AspNetAngularTemplate.Mapping
{
    public class AutoMapperProfileConfiguration : Profile
    {
        protected override void Configure()
        {
            CreateMap<Facility, FacilityDto>();
            CreateMap<AccessPoint, AccessPointDto>();
        }
    }
}