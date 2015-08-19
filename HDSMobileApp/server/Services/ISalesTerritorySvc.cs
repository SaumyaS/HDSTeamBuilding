using System.ServiceModel;
using System.ServiceModel.Web;
using HDSMobileApp.Entities;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;

namespace HDSMobileApp.Services
{

    [ServiceContract]
    public interface ISalesTerritorySvc
    {
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "/SalesTerritory/Search",
            RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        SearchResult<SalesTerritory> Search(Searchable<SalesTerritorySearcher> searchData);

    }

}
